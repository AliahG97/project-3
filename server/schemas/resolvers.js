const {Product, User, Order} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        products: async (parent, {name}) => {
            const params = {};

            if(name){
                params.name = { $regex: name};
            }
            
            return await Product.find(params);
        },
        product: async (parent, {_id}) => {
            return await Product.findById(_id);
        },
        user: async (parent, args, context) =>{
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products'
                    //populate: {path: 'products'} 
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw AuthenticationError;
        },
        order: async (parent, {_id}, context) => {
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path:'order.products',
                    //populate: {path: 'products'} 
                });

                return user.orders.id(_id);
            }

            throw AuthenticationError;

        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products});
            const line_items = [];

            const {products} = await order.populate('products').execPopulate();

            for(let i = 0; i < products.length; i++){
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].image}`]
                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'cad',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items,
                    mode: 'payment',
                    success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${url}/`
                });

                return {session: session.id};

            }

        }
    },
    Mutation: {
        updateProduct: async (parent, {_id, quantity }) => {
            const subtractOne = Math.abs(quantity) * -1;

            return await Product.findByIdAndUpdate(_id, { $inc: {quantity: subtractOne}}, {new: true});
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw AuthenticationError;
            }

            const correctPass = await user.isCorrectPassword(password);

            if(!correctPass){
                throw AuthenticationError;
            }

            const token = signToken(user);

            return {token, user};

        },
        updateUser: async (parent, args, context) => {
            if(context.user){
                return await User.findByIdAndUpdate(context.user._id, args, {new: true});
            }

            throw AuthenticationError;

        },
        addOrder: async (parent, {products}, context) => {
            if(context.user){
                const order = new Order({products});

                await User.findByIdAndUpdate(context.user._id, { $push: {orders: order}});

                return order;

            }

            throw AuthenticationError;
        }

    }
};

module.exports = resolvers;

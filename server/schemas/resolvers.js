const {Product, User, Order} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        product: async (parent, {_id}) => {
            return await Product.findById(_id);
        },
        user: async (parent, args, context) =>{
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products'
                    //populate: ??
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw AuthenticationError;
        },
        order: async (parent, {_id}, context) => {
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path:'order.products'
                    //populate: ??
                });

                return user.orders.id(_id);
            }

            throw AuthenticationError;

        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products});
            const line_items = [];

            const {products} = await order.populate('products');

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

                const session = await stripe.checkout.sesssions.create({
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

    }
};

module.exports = resolvers;


const typeDefs = `
    type Product{
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
    }

    type User{
        _id: ID
        firstName: String
        lastName: String
        email: String
        orders: [Order]
    }

    type Order{
        _id: ID
        purchaseDate: String
        products: [Products]
    }

    type Checkout{
        session: ID
    }

    type Auth{
        token: ID
        user: User
    }

    type Query{
        product(_id: ID!): Product
        user: User
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
    }

    type Mutation{
        updateProduct(_id: ID!, quantity: Int!, price: Float!): Product
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        addOrder(products: [ID]!): Order
    }

`;

module.exports = typeDefs;
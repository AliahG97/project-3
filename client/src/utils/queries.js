import { gql } from '@apollo/client';


export const QUERY_USER_DATA = gql`

query Query {
    user {
      _id
      firstName
      lastName
      email
      orders {
        purchaseDate
        _id
        products {
          _id
          name
          description
          image
          quantity
          price
        }
      }
    }
  }`;

export const QUERY_SEARCH_PRODUCTS = gql`query Query($name: String) {
  products(name: $name) {
    name
    _id
    description
    image
    price
    quantity
  }
}`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const QUERY_USER_DATA = gql`
  {
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

export const QUERY_ORDERS = gql`{
  query getUser (id: ID) {
    user(_id: id) {
      _id
      firstName
      lastName
      orders {
        _id
        purchaseDate
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
}`
export const QUERY_ONE_ORDER = gql`{
  order {
    _id
    purchaseDate
    products {
      _id
      name
      description
      image
      quantity
      price
    }
  }
}`
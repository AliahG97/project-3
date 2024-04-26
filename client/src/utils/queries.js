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
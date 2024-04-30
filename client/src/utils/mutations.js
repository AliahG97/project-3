import { gql } from '@apollo/client';

export const MUTATION_CREATE_USER = gql`
mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
    }
  }`;

export const MUTATION_LOGIN = gql`mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }`;


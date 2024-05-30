import { graphql } from 'relay-runtime'

export const RegisterUserMutation = graphql`
  mutation RegisterUserMutation($input: RegisterUserInput!) {
    RegisterUser(input: $input) {
      jwt
      user {
        firstName
        lastName
        taxId
      }
    }
  }
`

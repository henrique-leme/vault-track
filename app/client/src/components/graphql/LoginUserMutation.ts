import { graphql } from 'relay-runtime'

export const LoginUserMutation = graphql`
  mutation LoginUserMutation($input: LoginUserInput!) {
    LoginUser(input: $input) {
      jwt
      validUser {
        firstName
        lastName
        taxId
      }
    }
  }
`

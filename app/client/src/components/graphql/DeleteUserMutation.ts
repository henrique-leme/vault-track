import { graphql } from 'relay-runtime'

export const DeleteUserMutation = graphql`
  mutation DeleteUserMutation($input: DeleteUserInput!) {
    DeleteUser(input: $input) {
      message
      deletedUser {
        firstName
        lastName
        taxId
      }
    }
  }
`

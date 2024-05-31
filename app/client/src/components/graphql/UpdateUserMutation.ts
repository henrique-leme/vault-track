import { graphql } from 'relay-runtime'

export const UpdateUserMutation = graphql`
  mutation UpdateUserMutation($input: UpdateUserInput!) {
    UpdateUser(input: $input) {
      updatedUser {
        firstName
        lastName
      }
    }
  }
`

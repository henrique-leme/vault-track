import { graphql } from 'relay-runtime'

export const CreateTransactionMutation = graphql`
  mutation CreateTransactionMutation(
    $sender: String!
    $receiver: String!
    $amount: Float!
    $type: TransactionType!
    $description: String
  ) {
    CreateTransaction(
      input: {
        sender: $sender
        receiver: $receiver
        amount: $amount
        type: $type
        description: $description
      }
    ) {
      message
    }
  }
`

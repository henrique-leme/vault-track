import { graphql } from 'relay-runtime'

export const TransactionsListQuery = graphql`
  query TransactionsListQuery($accountNumber: String!) {
    AccountTransactions(accountNumber: $accountNumber) {
      edges {
        node {
          description
          type
          amount
          receiver
          sender
        }
      }
    }
  }
`

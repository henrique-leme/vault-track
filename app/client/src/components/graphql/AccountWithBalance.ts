import { graphql } from 'relay-runtime'

export const AccountWithBalance = graphql`
  query AccountWithBalanceQuery($taxId: String!) {
    accountWithUpdatedBalance(taxId: $taxId) {
      edges {
        node {
          balance
          accountNumber
        }
      }
    }
  }
`

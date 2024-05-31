/**
 * @generated SignedSource<<07e42523d8eb363cdf5e26f1408f6f7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TransactionType = "DEPOSIT" | "TRANSFER" | "%future added value";
export type TransactionsListQuery$variables = {
  accountNumber: string;
};
export type TransactionsListQuery$data = {
  readonly AccountTransactions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly amount: number | null | undefined;
        readonly description: string | null | undefined;
        readonly receiver: string | null | undefined;
        readonly sender: string | null | undefined;
        readonly type: TransactionType | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type TransactionsListQuery = {
  response: TransactionsListQuery$data;
  variables: TransactionsListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "accountNumber"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "accountNumber",
        "variableName": "accountNumber"
      }
    ],
    "concreteType": "TransactionConnection",
    "kind": "LinkedField",
    "name": "AccountTransactions",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "amount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "receiver",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "sender",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TransactionsListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TransactionsListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9007a0b92d6b5dbcdb28b44d86fd4940",
    "id": null,
    "metadata": {},
    "name": "TransactionsListQuery",
    "operationKind": "query",
    "text": "query TransactionsListQuery(\n  $accountNumber: String!\n) {\n  AccountTransactions(accountNumber: $accountNumber) {\n    edges {\n      node {\n        description\n        type\n        amount\n        receiver\n        sender\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5fc72051fdb1b6395e028c6696333b93";

export default node;

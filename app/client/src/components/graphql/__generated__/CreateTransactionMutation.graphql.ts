/**
 * @generated SignedSource<<95f8587b812501bdb35bb3b0c7b0d678>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TransactionType = "DEPOSIT" | "TRANSFER" | "%future added value";
export type CreateTransactionMutation$variables = {
  amount: number;
  description?: string | null | undefined;
  receiver: string;
  sender: string;
  type: TransactionType;
};
export type CreateTransactionMutation$data = {
  readonly CreateTransaction: {
    readonly message: string | null | undefined;
  } | null | undefined;
};
export type CreateTransactionMutation = {
  response: CreateTransactionMutation$data;
  variables: CreateTransactionMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "amount"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "receiver"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sender"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "type"
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "amount",
            "variableName": "amount"
          },
          {
            "kind": "Variable",
            "name": "description",
            "variableName": "description"
          },
          {
            "kind": "Variable",
            "name": "receiver",
            "variableName": "receiver"
          },
          {
            "kind": "Variable",
            "name": "sender",
            "variableName": "sender"
          },
          {
            "kind": "Variable",
            "name": "type",
            "variableName": "type"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "CreateTransactionPayload",
    "kind": "LinkedField",
    "name": "CreateTransaction",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateTransactionMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateTransactionMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "c1272ca269cb25f84bfa39f477b06471",
    "id": null,
    "metadata": {},
    "name": "CreateTransactionMutation",
    "operationKind": "mutation",
    "text": "mutation CreateTransactionMutation(\n  $sender: String!\n  $receiver: String!\n  $amount: Float!\n  $type: TransactionType!\n  $description: String\n) {\n  CreateTransaction(input: {sender: $sender, receiver: $receiver, amount: $amount, type: $type, description: $description}) {\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "8712e0a27c748a35e3461e8f64f8164b";

export default node;

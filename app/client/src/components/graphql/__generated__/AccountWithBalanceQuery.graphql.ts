/**
 * @generated SignedSource<<c9f0d235439cb974da0ccba87a03b4df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AccountWithBalanceQuery$variables = {
  taxId: string;
};
export type AccountWithBalanceQuery$data = {
  readonly accountWithUpdatedBalance: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly accountNumber: string | null | undefined;
        readonly balance: string | null | undefined;
        readonly uniqueId: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type AccountWithBalanceQuery = {
  response: AccountWithBalanceQuery$data;
  variables: AccountWithBalanceQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "taxId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "taxId",
        "variableName": "taxId"
      }
    ],
    "concreteType": "AccountConnection",
    "kind": "LinkedField",
    "name": "accountWithUpdatedBalance",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "uniqueId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "accountNumber",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "balance",
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
    "name": "AccountWithBalanceQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AccountWithBalanceQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "242bb018a31b35e58fe94de8e6aa4915",
    "id": null,
    "metadata": {},
    "name": "AccountWithBalanceQuery",
    "operationKind": "query",
    "text": "query AccountWithBalanceQuery(\n  $taxId: String!\n) {\n  accountWithUpdatedBalance(taxId: $taxId) {\n    edges {\n      node {\n        uniqueId\n        accountNumber\n        balance\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "efba6d87f5e3b6c4ddc74123e0987406";

export default node;

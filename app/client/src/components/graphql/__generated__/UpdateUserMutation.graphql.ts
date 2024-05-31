/**
 * @generated SignedSource<<c823249510b8806b627eed892b915a89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateUserInput = {
  clientMutationId?: string | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  newPassword?: string | null | undefined;
  password: string;
};
export type UpdateUserMutation$variables = {
  input: UpdateUserInput;
};
export type UpdateUserMutation$data = {
  readonly UpdateUser: {
    readonly updatedUser: {
      readonly firstName: string | null | undefined;
      readonly lastName: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type UpdateUserMutation = {
  response: UpdateUserMutation$data;
  variables: UpdateUserMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateUserPayload",
    "kind": "LinkedField",
    "name": "UpdateUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "updatedUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
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
    "name": "UpdateUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "80ebf05de4b2902aaaeda8ba5517b4b6",
    "id": null,
    "metadata": {},
    "name": "UpdateUserMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateUserMutation(\n  $input: UpdateUserInput!\n) {\n  UpdateUser(input: $input) {\n    updatedUser {\n      firstName\n      lastName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c3f95faf3a81d5677dbc863852b6b41c";

export default node;

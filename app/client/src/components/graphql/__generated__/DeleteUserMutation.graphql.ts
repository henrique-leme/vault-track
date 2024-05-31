/**
 * @generated SignedSource<<ce625db40da68ce87cca903b56886f22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteUserInput = {
  clientMutationId?: string | null | undefined;
  jwt: string;
  taxId: string;
};
export type DeleteUserMutation$variables = {
  input: DeleteUserInput;
};
export type DeleteUserMutation$data = {
  readonly DeleteUser: {
    readonly deletedUser: {
      readonly firstName: string | null | undefined;
      readonly lastName: string | null | undefined;
      readonly taxId: string | null | undefined;
    } | null | undefined;
    readonly message: string | null | undefined;
  } | null | undefined;
};
export type DeleteUserMutation = {
  response: DeleteUserMutation$data;
  variables: DeleteUserMutation$variables;
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
    "concreteType": "DeleteUserPayload",
    "kind": "LinkedField",
    "name": "DeleteUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "deletedUser",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "taxId",
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
    "name": "DeleteUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2da29b46c942769e97f4e108d0e468e3",
    "id": null,
    "metadata": {},
    "name": "DeleteUserMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteUserMutation(\n  $input: DeleteUserInput!\n) {\n  DeleteUser(input: $input) {\n    message\n    deletedUser {\n      firstName\n      lastName\n      taxId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "adba0c674de43ce5f7519e4c774ed7bf";

export default node;

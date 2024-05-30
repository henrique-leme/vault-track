/**
 * @generated SignedSource<<0bca43f8a728576072fabf9b8c41d570>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RegisterUserInput = {
  clientMutationId?: string | null | undefined;
  firstName: string;
  lastName?: string | null | undefined;
  password: string;
  taxId: string;
};
export type RegisterUserMutation$variables = {
  input: RegisterUserInput;
};
export type RegisterUserMutation$data = {
  readonly RegisterUser: {
    readonly jwt: string | null | undefined;
    readonly user: {
      readonly firstName: string | null | undefined;
      readonly lastName: string | null | undefined;
      readonly taxId: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type RegisterUserMutation = {
  response: RegisterUserMutation$data;
  variables: RegisterUserMutation$variables;
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
    "concreteType": "RegisterUserPayload",
    "kind": "LinkedField",
    "name": "RegisterUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "jwt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
    "name": "RegisterUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RegisterUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "37b81de9f644e42f485ecde9a2666d5c",
    "id": null,
    "metadata": {},
    "name": "RegisterUserMutation",
    "operationKind": "mutation",
    "text": "mutation RegisterUserMutation(\n  $input: RegisterUserInput!\n) {\n  RegisterUser(input: $input) {\n    jwt\n    user {\n      firstName\n      lastName\n      taxId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "84f28869185b878141655d2aeeaeb85f";

export default node;

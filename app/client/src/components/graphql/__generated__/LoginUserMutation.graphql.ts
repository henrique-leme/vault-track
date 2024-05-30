/**
 * @generated SignedSource<<1026de41a8f740a21249ce54f1ecb690>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginUserInput = {
  clientMutationId?: string | null | undefined;
  password: string;
  taxId: string;
};
export type LoginUserMutation$variables = {
  input: LoginUserInput;
};
export type LoginUserMutation$data = {
  readonly LoginUser: {
    readonly jwt: string | null | undefined;
    readonly validUser: {
      readonly firstName: string | null | undefined;
      readonly lastName: string | null | undefined;
      readonly taxId: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type LoginUserMutation = {
  response: LoginUserMutation$data;
  variables: LoginUserMutation$variables;
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
    "concreteType": "LoginUserPayload",
    "kind": "LinkedField",
    "name": "LoginUser",
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
        "name": "validUser",
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
    "name": "LoginUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9f3789f3137daaf54b4cf93bd92c3b5d",
    "id": null,
    "metadata": {},
    "name": "LoginUserMutation",
    "operationKind": "mutation",
    "text": "mutation LoginUserMutation(\n  $input: LoginUserInput!\n) {\n  LoginUser(input: $input) {\n    jwt\n    validUser {\n      firstName\n      lastName\n      taxId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "31491a7dd29adf594eed0a7f8339553b";

export default node;

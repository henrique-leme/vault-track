import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime'

const HTTP_ENDPOINT = 'http://localhost:8080/graphql'

const fetchFn = async (
  request: RequestParameters,
  variables: Variables,
  token: string,
) => {
  const response = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept:
        'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  })

  return await response.json()
}

export const createRelayEnvironment = (token: string) => {
  return new Environment({
    network: Network.create((request, variables) =>
      fetchFn(request, variables, token),
    ),
    store: new Store(new RecordSource()),
  })
}

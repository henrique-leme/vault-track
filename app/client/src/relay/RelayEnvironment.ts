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
  token?: string,
  idempotencyId?: string,
) => {
  const headers = {
    Accept:
      'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(idempotencyId && { idempotencyid: idempotencyId }),
  }

  const response = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  })

  return await response.json()
}

export const createRelayEnvironment = (
  token?: string,
  idempotencyId?: string,
) => {
  return new Environment({
    network: Network.create((request, variables) =>
      fetchFn(request, variables, token, idempotencyId),
    ),
    store: new Store(new RecordSource()),
  })
}

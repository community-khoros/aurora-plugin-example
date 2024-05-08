import type { EndpointHandlerContext } from 'aurora/externalServerContext';
import type { RouteParameters } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

interface CatFactResponse {
  message: string;
}

/**
 * Calls the cat fact API and returns a cat fact.
 * @param context the endpoint handler context.
 */
async function handler<
  Route extends string,
  P = RouteParameters<Route>,
  RequestBody = unknown,
  RequestQuery = ParsedQs,
  LocalsObject extends Record<string, unknown> = Record<string, unknown>
>(
  context: EndpointHandlerContext<P, CatFactResponse, RequestBody, RequestQuery, LocalsObject>
): Promise<void> {
  const { client, server } = context;
  const { request, response } = server;
  const { originalUrl } = request;
  // eslint-disable-next-line no-console
  console.log('Getting request at', originalUrl);
  const apiResponse = await client.fetch('https://catfact.ninja/fact');
  if (apiResponse.ok) {
    const json = (await apiResponse.json()) as Record<string, unknown>;
    response.json({
      message: `Cat fact: ${json.fact}`
    });
  } else {
    response.status(apiResponse.status).send({ message: 'Error!' });
  }
}

export default handler;

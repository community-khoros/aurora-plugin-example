import type { EndpointHandlerContext } from 'aurora/externalServerContext';
import type { RouteParameters } from 'express-serve-static-core';

interface CatFactResponse {
  message: string;
}

async function handler(context: EndpointHandlerContext<RouteParameters<string>, CatFactResponse>) {
  const {
    client: { fetch },
    server: { request, response },
    utils: { log }
  } = context;
  log.info('Handling request at', request.originalUrl);
  const apiResponse = await fetch('https://catfact.ninja/fact');
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

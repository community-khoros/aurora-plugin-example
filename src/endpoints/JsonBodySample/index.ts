import type { EndpointHandlerContext } from 'aurora/externalServerContext';
import type { RouteParameters } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

interface ExampleRequestBody {
  testString: string;
  testNumber: number;
  testBoolean: boolean;
}

interface ExampleResponse {
  testString: string;
  testNumber: number;
  testBoolean: boolean;
}

interface ErrorResponse {
  message: string;
}

async function handler<Route extends string, P = RouteParameters<Route>, RequestQuery = ParsedQs>(
  context: EndpointHandlerContext<
    P,
    ExampleResponse | ErrorResponse,
    ExampleRequestBody,
    RequestQuery
  >
): Promise<void> {
  const {
    server: {
      request: { originalUrl, body },
      response
    },
    utils: { log }
  } = context;
  try {
    const { testString, testNumber, testBoolean } = body as ExampleRequestBody;
    // eslint-disable-next-line no-console
    log.debug('Getting request at', originalUrl);
    // eslint-disable-next-line no-console
    log.debug(`testString:${testString}, testNumber: ${testNumber}, testBoolean: ${testBoolean}`);
    response.json({
      testString,
      testNumber,
      testBoolean
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    log.error(error, 'error while executing JsonBodySample endpoint.');
    response.status(500).send({ message: error.message });
  }
}

export default handler;

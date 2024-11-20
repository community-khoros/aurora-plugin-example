import type { EndpointHandler, EndpointHandlerContext } from 'aurora/externalServerContext';
import type { ParamsDictionary } from 'express-serve-static-core';

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

const endpointHandler: EndpointHandler<
  ParamsDictionary,
  ExampleResponse | ErrorResponse,
  ExampleRequestBody
> = async function (
  context: EndpointHandlerContext<
    ParamsDictionary,
    ExampleResponse | ErrorResponse,
    ExampleRequestBody
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
      testNumber: Number(testNumber),
      testBoolean: Boolean(testBoolean)
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    log.error(error, 'error while executing UrlEncodedBodySample endpoint.');
    response.status(500).send({ message: error.message });
  }
};

export default endpointHandler;

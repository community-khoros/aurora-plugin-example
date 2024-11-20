import type {
  EndpointHandlerContext,
  EndpointServerRequestFile
} from 'aurora/externalServerContext';
import type { RouteParameters } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

interface FileUploadExampleResponse {
  message: string;
}

/**
 * Calls the file upload API and returns a message.
 * @param context the endpoint handler context.
 */
async function handler<
  Route extends string,
  P = RouteParameters<Route>,
  RequestBody = unknown,
  RequestQuery = ParsedQs
>(
  context: EndpointHandlerContext<P, FileUploadExampleResponse, RequestBody, RequestQuery>
): Promise<void> {
  const {
    server: {
      caller: { uid },
      request,
      response
    },
    utils: { log }
  } = context;
  const { originalUrl } = request;
  // eslint-disable-next-line no-console
  log.info(`Getting request at ${originalUrl} for caller id ${uid}`);
  if (request.files) {
    // eslint-disable-next-line prefer-destructuring,dot-notation
    const file: EndpointServerRequestFile = request.files[0];
    const { fieldName, originalName, size, mimetype } = file;
    if (fieldName === 'test_file') {
      log.info(`Received file: ${fieldName} ${originalName} ${size} ${mimetype}`);
      response.json({
        message: `Received file: ${fieldName} ${originalName} ${size} ${mimetype}`
      });
    } else {
      response.status(404).send({ message: 'no file found.' });
    }
  } else {
    response.status(403).send({ message: 'files not supported.' });
  }
}

export default handler;

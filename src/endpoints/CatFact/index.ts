/*
 * Copyright 2024 Khoros, LLC.
 * Austin, Texas, U.S.A.  All Rights Reserved.
 *
 * This software is the  confidential and proprietary information
 * of  Khoros, LLC.  ("Confidential Information")
 * You shall not disclose such Confidential Information and shall
 * use  it  only in  accordance  with  the terms of  the  license
 * agreement you entered into with Khoros.
 */

import type { EndpointHandlerContext } from 'aurora/externalServerContext';
import type { RouteParameters } from 'express-serve-static-core';

interface CatFactResponse {
  message: string;
}

const API = 'https://catfact.ninja/fact';

/**
 * This endpoint calls the API at https://catfact.ninja and proxies the response.  It also logs the current request URL
 * to the plugin log.
 * @param context
 */
async function handler(context: EndpointHandlerContext<RouteParameters<string>, CatFactResponse>) {
  const {
    client: { fetch },
    server: { request, response },
    utils: { log }
  } = context;
  log.info('Handling request at', request.originalUrl);
  const apiResponse = await fetch(API);
  if (apiResponse.ok) {
    const json = (await apiResponse.json()) as Record<string, unknown>;
    return response.json({
      message: `Cat fact: ${json.fact}`
    });
  } else {
    return response.status(apiResponse.status).send({ message: 'Error!' });
  }
}

export default handler;

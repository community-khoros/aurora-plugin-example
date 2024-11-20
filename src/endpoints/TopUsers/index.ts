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
import topUsersQuery from './queries/TopUsers.query.graphql';
import type { TopUsersQuery, TopUsersQueryVariables } from './types/graphql-types';

/**
 * This endpoint reutrns the results of a GraphQL query for the top users in a community.
 * @param context
 */
async function handler(context: EndpointHandlerContext<RouteParameters<string>, TopUsersQuery>) {
  const {
    client: { graphqlAdmin },
    server: { response },
    utils: { log }
  } = context;
  log.info('Handling request');
  const queryResponse = await graphqlAdmin.query<TopUsersQueryVariables, TopUsersQuery>({
    query: topUsersQuery
  });
  response.json(queryResponse.data);
}

export default handler;

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
import type { CustomComponentProps } from 'aurora/externalContext';
import React, { Suspense } from 'react';
import graphqlQuery from './sample.query.graphql';
import type { SampleQuery, SampleQueryVariables } from './types/graphql-types';

/**
 * This example component makes a graphql query and displays the results using Aurora UI components.
 */
const GraphQLQuery: React.FC<CustomComponentProps> = ({ auroraContext }) => {
  const { components, pageContext, utils } = auroraContext;
  const { log, useClassNameMapper, useSuspenseQuery } = utils;
  const { Alert, NodeLink, Panel, PanelBody, UserAvatar, UserLink, enums } = components;
  const { IconSize } = enums;
  const { tenant } = pageContext;
  const { phase } = tenant;

  const cx = useClassNameMapper();

  const queryResult = useSuspenseQuery<SampleQuery, SampleQueryVariables>(graphqlQuery);

  log.info('Query result %O ', queryResult.data);

  const { data, error } = queryResult;

  if (error) {
    log.error(error, 'Error in graphql query');
    return null;
  }
  const { self, community } = data;

  return (
    <div className={cx('test-style')}>
      <Panel>
        <PanelBody>
          <p>
            <NodeLink node={community}>{community.title}</NodeLink> is a {phase} community
          </p>
        </PanelBody>
      </Panel>
      <p />
      <Alert variant="warning" className={cx('mb-0')}>
        <p>
          <UserAvatar user={self} size={IconSize.PX_24} /> Current user is{' '}
          <UserLink user={self}>{self.login}</UserLink>
        </p>
      </Alert>
    </div>
  );
};

function SampleSuspense(props: CustomComponentProps) {
  const { auroraContext } = props;
  const { components } = auroraContext;
  const { Loading, enums } = components;
  const { LoadingVariant } = enums;
  return (
    <Suspense fallback={<Loading variant={{ type: LoadingVariant.LINEAR }} />}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GraphQLQuery {...props} />
    </Suspense>
  );
}

export default SampleSuspense;

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
import React from 'react';

/**
 * This example component makes a graphql query and displays the results using Aurora UI components.
 */
const PageContext: React.FC<CustomComponentProps> = ({ auroraContext }) => {
  const { components, pageContext, utils } = auroraContext;
  const { useClassNameMapper } = utils;
  const { Alert, NodeLink, Panel, PanelBody, UserAvatar, UserLink, enums } = components;
  const { IconSize } = enums;
  const { tenant, authUser, community, contextNode, contextMessage, contextUser } = pageContext;
  const { phase } = tenant;

  const cx = useClassNameMapper();

  return (
    <div className={cx('test-style')}>
      <Panel>
        <PanelBody>
          {community.title} is a {phase} community
        </PanelBody>
        {contextNode && (
          <PanelBody>
            <NodeLink node={contextNode}>{contextNode.title}</NodeLink> the context node
          </PanelBody>
        )}
        {contextMessage && <PanelBody>{contextMessage.subject} the context message</PanelBody>}
        {contextUser && <PanelBody>{contextUser.login} the context user</PanelBody>}
      </Panel>
      <Alert variant="warning" className={cx('mb-0')}>
        <span>
          <UserAvatar user={authUser} size={IconSize.PX_24} /> Current user is{' '}
          <UserLink user={authUser}>{authUser.login}</UserLink>
        </span>
      </Alert>
    </div>
  );
};

export default PageContext;

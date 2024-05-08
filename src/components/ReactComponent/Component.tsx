import type { CustomComponentProps } from 'aurora/externalContext';
import React from 'react';

/**
 * This is a custom component.
 */
const Component: React.FC<CustomComponentProps> = ({ auroraContext }) => {
  const { components, utils } = auroraContext;
  const { i18n } = utils;
  const { Panel, PanelBody } = components;

  return (
    <div>
      <Panel>
        <PanelBody>
          {/* Use the i18 object to format messages stored in localized text bundles. */}
          <p>{i18n.formatMessage('sample.component.body')}</p>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default Component;

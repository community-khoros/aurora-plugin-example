import type { CustomComponentProps } from 'aurora/externalContext';
import type { Community, User } from 'aurora/graphql/schema';
import React, { Suspense, useState } from 'react';
import styles from './Sample.module.css';
import graphqlQuery from './sample.query.graphql';

/**
 * This is a sample custom component.
 */
interface Props extends CustomComponentProps {
  /**
   * The component title.  This comes from the component descriptor props.
   */
  title: string;
}

/**
 * This is a sample custom component.
 */
const Component: React.FC<Props> = ({ title, auroraContext }) => {
  const { components, pageContext, utils } = auroraContext;
  const { log, i18n, useClassNameMapper, useSuspenseQuery, addToast, postToInternalApi } = utils;
  const {
    Alert,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalTitle,
    NodeLink,
    Panel,
    PanelBody,
    UserAvatar,
    UserLink,
    enums
  } = components;
  const { IconSize, ToastVariant, ToastAlertVariant } = enums;
  const { tenant } = pageContext;
  const { phase } = tenant;

  const [showModal, setShowModal] = useState<boolean>(false);

  const cx = useClassNameMapper(styles);

  const queryResult = useSuspenseQuery(graphqlQuery);

  function showToast(
    toastTitle: string,
    toastMessage: string,
    toastVariant = ToastVariant.FLYOUT,
    toastAlertVariant = ToastAlertVariant.SUCCESS
  ) {
    addToast({
      id: 'mf-toast',
      title: toastTitle,
      message: toastMessage,
      toastVariant,
      alertVariant: toastAlertVariant
    });
  }

  async function fetchCatFact() {
    try {
      const endpoint = '/endpoints/catfact';
      const factResponse = await postToInternalApi(endpoint);
      if (factResponse.ok) {
        const json = await factResponse.json();
        const [toastTitle, toastMessage] = json.message.split(':');
        showToast(toastTitle, toastMessage, ToastVariant.BANNER, ToastAlertVariant.INFO);
      } else {
        log.warn('Unable to call endpoint at %s: %s', endpoint, factResponse.statusText);
      }
    } catch (error) {
      log.error(error, 'Error fetching cat fact');
    }
  }

  log.info('Query result %O ', queryResult.data);

  const data = queryResult.data as Record<string, unknown>;

  const self = data.self as User;

  const node = data.community as Community;

  return (
    <div className={cx('test-style')}>
      <Panel>
        <PanelBody>
          {title && <p>Component title: {title}</p>}
          <p>
            <NodeLink node={node}>{node.title}</NodeLink> is a {phase} community
          </p>
          <p>
            <Button onClick={() => showToast('Test toast!', 'Toast from federated module')}>
              I propose a toast
            </Button>
          </p>
          <p>
            <Button onClick={() => setShowModal(true)}>A different modality</Button>
          </p>
          <p>
            <Button onClick={() => fetchCatFact()}>Cat fact!</Button>
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
      <Modal show={showModal} size="sm" onHide={() => setShowModal(false)} centered>
        <ModalHeader closeButton>
          <ModalTitle>Demo modal</ModalTitle>
        </ModalHeader>
        <ModalBody>This is a modal!</ModalBody>
      </Modal>
      {/* Use the i18 object to format messages stored in localized text bundles. */}
      <Panel>
        <PanelBody>
          <p>{i18n.formatMessage('sample.component.hipsum')}</p>
        </PanelBody>
      </Panel>
    </div>
  );
};

function SampleSuspense(props: Props) {
  const { auroraContext } = props;
  const { components } = auroraContext;
  const { Loading, enums } = components;
  const { LoadingVariant } = enums;
  return (
    <Suspense fallback={<Loading variant={{ type: LoadingVariant.LINEAR }} />}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </Suspense>
  );
}

export default SampleSuspense;

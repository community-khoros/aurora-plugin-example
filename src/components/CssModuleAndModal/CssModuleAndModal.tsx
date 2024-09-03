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
import React, { useState } from 'react';
import styles from './Sample.module.pcss';

/**
 * This example component uses styling from CSS modules and i18n text keys, and displays a modal on button click.
 */
const CssModuleAndModal: React.FC<CustomComponentProps> = ({ auroraContext }) => {
  const { components, utils } = auroraContext;
  const { log, i18n, useClassNameMapper } = utils;
  const { Button, Modal, ModalHeader, ModalBody, ModalTitle } = components;

  const [showModal, setShowModal] = useState<boolean>(false);

  const cx = useClassNameMapper(styles);

  function handleModalButtonClick() {
    log.info('Showing modal...');
    setShowModal(true);
  }

  return (
    <div className={cx('test-style')}>
      <Button onClick={handleModalButtonClick}>{i18n.formatMessage('modal.button.title')}</Button>
      <Modal show={showModal} size="sm" onHide={() => setShowModal(false)} centered>
        <ModalHeader closeButton>
          <ModalTitle>{i18n.formatMessage('modal.title')}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>{i18n.formatMessage('modal.body')}</p>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CssModuleAndModal;

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
 * This example component calls the custom CatFact endpoint and displays a toast with the result.
 */
const CatFactToast: React.FC<CustomComponentProps> = ({ auroraContext }) => {
  const { components, utils } = auroraContext;
  const { log, i18n, addToast, postToInternalApi } = utils;
  const { Button, Panel, PanelBody, enums } = components;
  const { ToastVariant, ToastAlertVariant } = enums;

  function showToast(
    toastTitle: string,
    toastMessage: string,
    toastVariant = ToastVariant.FLYOUT,
    toastAlertVariant = ToastAlertVariant.SUCCESS
  ) {
    addToast({
      id: 'catfact-toast',
      title: toastTitle,
      message: toastMessage,
      toastVariant,
      alertVariant: toastAlertVariant
    });
  }

  async function fetchCatFact() {
    try {
      const endpoint = '/endpoints/CatFact';
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

  return (
    <div>
      <Panel>
        <PanelBody>
          <p>
            <Button onClick={() => fetchCatFact()}>{i18n.formatMessage('button.title')}</Button>
          </p>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default CatFactToast;

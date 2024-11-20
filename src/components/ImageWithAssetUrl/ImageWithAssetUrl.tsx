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

import catImage from './assets/cat.svg';
import catImage2 from './assets/cat2.jpg';

/**
 * This example component shows how to reference a local image using the `assetUrl` function.
 */
const ImageWithAssetUrl: React.FC<CustomComponentProps> = ({ auroraContext }) => {
  const { utils } = auroraContext;
  const { assetUrl } = utils;

  return (
    <div>
      <img src={assetUrl(catImage.src)} alt="a cat" width="200" style={{ padding: '20px' }} />
      <img
        src={assetUrl(catImage2.src)}
        alt="another cat"
        width="200"
        style={{ padding: '20px' }}
      />
    </div>
  );
};

export default ImageWithAssetUrl;

import React from 'react';
import { Text } from 'react-native';

import Header from '@commonComponents/Header';
import { FontStyles } from '@constants/theme';
import Modal from '@commonComponents/Modal';

import DepositDivider from './components/DepositDivider';
import IDDetails from './components/IDDetails';
import { ID_TYPES } from './constants';

function Deposit({ modalRef }) {
  return (
    <Modal modalRef={modalRef} adjustToContentHeight>
      <Header center={<Text style={FontStyles.Subtitle2}>Deposit</Text>} />
      <IDDetails idType={ID_TYPES.PRINCIPAL_ID} />
      <DepositDivider />
      <IDDetails idType={ID_TYPES.ACCOUNT_ID} />
    </Modal>
  );
}

export default Deposit;

import React from 'react';
import { Text } from 'react-native';

import DepositDivider from './components/DepositDivider';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import IDDetails from './components/IDDetails';
import Modal from '../../components/modal';
import { ID_TYPES } from './constants';

const Deposit = ({ modalRef }) => {
  return (
    <Modal modalRef={modalRef} adjustToContentHeight>
      <Header center={<Text style={FontStyles.Subtitle2}>Deposit</Text>} />
      <IDDetails idType={ID_TYPES.PRINCIPAL_ID} />
      <DepositDivider />
      <IDDetails idType={ID_TYPES.ACCOUNT_ID} />
    </Modal>
  );
};

export default Deposit;

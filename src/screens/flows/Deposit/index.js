import React from 'react';
import { useTranslation } from 'react-i18next';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import Text from '@/commonComponents/Text';

import DepositDivider from './components/DepositDivider';
import IDDetails from './components/IDDetails';
import { ID_TYPES } from './constants';

function Deposit({ modalRef }) {
  const { t } = useTranslation();
  return (
    <Modal modalRef={modalRef} adjustToContentHeight>
      <Header center={<Text type="subtitle2">{t('deposit.title')}</Text>} />
      <IDDetails idType={ID_TYPES.PRINCIPAL_ID} />
      <DepositDivider />
      <IDDetails idType={ID_TYPES.ACCOUNT_ID} />
    </Modal>
  );
}

export default Deposit;

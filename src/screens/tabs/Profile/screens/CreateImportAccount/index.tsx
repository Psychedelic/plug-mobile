import { t } from 'i18next';
import React, { RefObject, useRef } from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import { GradientText } from '@/components/common';
import Text from '@/components/common/Text';

import CreateAccount from '../CreateEditAccount';
import createAccountIcon from './assets/createIcon.png';
import pemFileIcon from './assets/pemFileIcon.png';
import privateKeyIcon from './assets/privateKeyIcon.png';
import styles from './styles';

interface Button {
  id: string;
  title: string;
  onPress: () => void;
  icon: ImageSourcePropType;
  colors: string[];
}

interface Props {
  modalRef: RefObject<Modalize>;
  accountsModal: RefObject<Modalize>;
}

function CreateImportAccount({ accountsModal, modalRef }: Props) {
  const createAccountRef = useRef<Modalize>(null);

  const closeModal = () => {
    // TODO: Delete !
    accountsModal?.current!.close();
  };

  const handleBack = () => {
    // TODO: Delete !
    modalRef?.current!.close();
  };

  const BUTTONS = [
    {
      id: 'create',
      title: 'Create',
      onPress: () => createAccountRef?.current?.open(),
      icon: createAccountIcon,
      colors: ['#00E8FF', '#44DC45'],
    },
    {
      id: 'import-key',
      title: 'Private Key',
      onPress: () => {},
      icon: privateKeyIcon,
      colors: ['#FB5DC3', '#FDB943'],
    },
    {
      id: 'import-pem',
      title: 'PEM file',
      onPress: () => {},
      icon: pemFileIcon,
      colors: ['#36C3E9', '#CF6ED3'],
    },
  ];

  const renderButton = ({ id, title, onPress, icon, colors }: Button) => (
    <TouchableOpacity key={id} onPress={onPress} style={styles.button}>
      <Image source={icon} />
      <GradientText type="subtitle3" colors={colors}>
        {title}
      </GradientText>
    </TouchableOpacity>
  );

  return (
    <Modal adjustToContentHeight modalRef={modalRef} onClose={() => {}}>
      <Header
        right={
          <Text style={styles.headerAction} onPress={closeModal}>
            {t('common.close')}
          </Text>
        }
        left={
          <Text style={styles.headerAction} onPress={handleBack}>
            {t('common.back')}
          </Text>
        }
        center={<Text type="subtitle2">{'Create/Import Account'}</Text>}
      />
      <View style={styles.container}>{BUTTONS.map(renderButton)}</View>
      <CreateAccount
        modalRef={createAccountRef}
        accountsModalRef={accountsModal}
        account={null}
      />
    </Modal>
  );
}

export default CreateImportAccount;

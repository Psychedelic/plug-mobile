import { t } from 'i18next';
import React from 'react';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import CommonItem from '@/components/common/CommonItem';
import Text from '@/components/common/Text';

interface Props {
  modalRef: any;
}

const CONNECTED_APPS_MOCK = [
  {
    name: 'WalletConnect',
    imageUri:
      'https://walletconnect.com/_next/static/media/logo_mark.84dd8525.svg',
    lastConection: 'Jun 14th, 2022',
    id: 1,
  },
  {
    name: 'Sonic',
    imageUri: 'https://sonic.ooo/favicon.ico',
    lastConection: 'Jun 14th, 2022',
    id: 2,
  },
];

function ConnectedApps({ modalRef }: Props) {
  const renderApp = (item: any) => {
    const { id, name, lastConection, imageUri } = item;
    const openApp = (app: any) => () => {
      console.log('app', app);
    };

    return (
      <CommonItem
        key={id}
        name={name}
        subtitle={lastConection}
        imageUri={imageUri}
        style={{ marginBottom: 24 }}
        onPress={openApp(item)}
      />
    );
  };

  return (
    <>
      <Modal
        modalRef={modalRef}
        adjustToContentHeight
        modalStyle={{ paddingHorizontal: 20 }}>
        <Header
          center={
            <Text type="subtitle2">
              {t('settings.items.connectedApps.name')}
            </Text>
          }
        />
        {CONNECTED_APPS_MOCK.map(renderApp)}
      </Modal>
    </>
  );
}

export default ConnectedApps;

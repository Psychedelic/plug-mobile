import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';

import RainbowButton from '../../components/buttons/RainbowButton';
import NftDisplayer from '../../components/common/NftDisplayer';
import Button from '../../components/buttons/Button';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import Badge from '../../components/common/Badge';
import useGetType from '../../hooks/useGetType';
import Modal from '../../components/modal';
import Section from './components/Section';
import styles from './styles';

const NftDetail = ({ modalRef, handleClose, selectedNFT, ...props }) => {
  const [type, setType] = useState(null);
  const selectedCollection = useSelector(state => state.user.collections).find(
    collection => collection.name === selectedNFT?.collection,
  );

  useGetType(selectedNFT?.url, setType);

  return (
    <Modal modalRef={modalRef} onClose={handleClose} {...props}>
      <Header
        center={
          <Text style={FontStyles.Subtitle2}>{`#${selectedNFT?.index}`}</Text>
        }
      />
      <View style={styles.content}>
        <View style={styles.nftDisplayerContainer}>
          <NftDisplayer
            url={selectedNFT?.url}
            type={type}
            style={styles.video}
            isDetailView
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Button variant="gray" text="Marketplace" onPress={() => null} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <RainbowButton text="Send" onPress={() => null} />
          </View>
        </View>
        <Section title="🧩 Collection" style={{ borderTopWidth: 0 }}>
          <Badge
            value={selectedNFT?.collection}
            icon={selectedCollection?.icon}
          />
          <Badge value={`#${selectedNFT?.index}`} />
        </Section>
        {!!selectedCollection?.description && (
          <Section title="📝 Description">
            <Text style={FontStyles.NormalGray}>
              {selectedCollection?.description}
            </Text>
          </Section>
        )}
        {selectedNFT?.metadata?.properties?.length && (
          <Section title="🎛 Attributes">
            {selectedNFT?.metadata?.properties?.map(prop => (
              <Badge key={prop.name} name={prop.name} value={prop.value} />
            ))}
          </Section>
        )}
      </View>
    </Modal>
  );
};

export default NftDetail;

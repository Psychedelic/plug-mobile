import { View, Text } from 'react-native';
import React, { useState } from 'react';

import RainbowButton from '../../components/buttons/RainbowButton';
import NftDisplayer, { NFT_QUALITY } from '../../components/common/NftDisplayer';
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
            quality={NFT_QUALITY.HIGH}
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
            icon={null /*collection?.icon*/}
          />
          <Badge value={`#${selectedNFT?.index}`} />
        </Section>
        {!!selectedNFT?.desc && (
          <Section title="📝 Description">
            <Text>{selectedNFT?.desc}</Text>
          </Section>
        )}
        {selectedNFT?.metadata?.properties?.length && (
          <Section title="🎛 Attributes">
            {selectedNFT?.metadata?.properties?.map(prop => (
              <Badge key={prop.name} name={prop.name} value={prop.value} />
            ))}
          </Section>
        )}
        {/*collection?.description && (
          <Section title='📝 About' style={{ paddingBottom: 25 }}>
            <Text style={styles.description}>
              {collection.description}
            </Text>
          </Section>
        )*/}
      </View>
    </Modal>
  );
};

export default NftDetail;

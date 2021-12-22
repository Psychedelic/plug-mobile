import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import RainbowButton from '../../components/buttons/RainbowButton';
import NftDisplayer from '../../components/common/NftDisplayer';
import Button from '../../components/buttons/Button';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import Badge from '../../components/common/Badge';
import Modal from '../../components/modal';
import Section from './components/Section';
import styles from './styles';

const NftDetail = ({ modalRef, handleClose, selectedNFT, ...props }) => {
  const [type, setType] = useState(null);

  useEffect(() => {
    const getType = async () =>
      await fetch(selectedNFT?.url).then(res =>
        setType(res.headers.get('Content-Type')),
      );
    getType();
    return () => setType(null);
  }, [selectedNFT?.url]);

  return (
    <Modal modalRef={modalRef} onClose={handleClose} {...props}>
      <Header
        center={
          <Text style={FontStyles.Subtitle2}>{`#${selectedNFT?.index}`}</Text>
        }
      />
      <View style={styles.content}>
        <View style={styles.nftDisplayerContainer}>
          {type ? (
            <NftDisplayer
              url={selectedNFT?.url}
              type={type}
              style={styles.video}
              isDetailView
            />
          ) : (
            <ActivityIndicator style={styles.activityIndicator} />
          )}
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

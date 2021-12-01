import React from 'react';
import Header from '../../components/common/Header';
import Modal from '../../components/modal';
import { FontStyles } from '../../constants/theme';
import { View, Text } from 'react-native';
import Section from './components/Section';
import Badge from '../../components/common/Badge';
import Button from '../../components/buttons/Button';
import RainbowButton from '../../components/buttons/RainbowButton';
import styles from './styles';
import NftDisplayer from '../../components/common/NftDisplayer';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const NftDetail = ({ modalRef, handleClose, ...props }) => {
  const { selectedNFT } = useSelector(state => state.keyring);
  const imageSize = Dimensions.get('window').width - 40;

  return (
    <Modal modalRef={modalRef} onClose={handleClose} {...props}>
      <Header
        center={
          <Text style={FontStyles.Subtitle2}>{`#${selectedNFT?.index}`}</Text>
        }
      />
      <View style={styles.content}>
        <NftDisplayer
          url={selectedNFT?.url}
          style={{ width: imageSize, height: imageSize }}
        />

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

import React from 'react';
import Header from '../../components/common/Header';
import Modal from '../../components/modal';
import { FontStyles } from '../../constants/theme';
import { View, Text } from 'react-native';
import Icon from '../../components/icons';
import Row from '../../components/layout/Row';
import Touchable from '../../components/animations/Touchable';
import Section from './components/Section';
import Badge from '../../components/common/Badge';
import { styles } from '../../components/buttons/RainbowButton/styles';
import Button from '../../components/buttons/Button';
import RainbowButton from '../../components/buttons/RainbowButton';


const MOCK = {
  index: 0,
  canister: 'asdasdsa',
  id: 1,
  name: 'test',
  url: 'test',
  metadata: null,
  standard: 'ICPUnks',
  collection: 'Test',
}

const NftDetail = ({ modalRef, handleClose, nft = MOCK, ...props }) => {

  return (
    <Modal
      modalRef={modalRef}
      onClose={handleClose}
      {...props}
    >
      <Header center={<Text style={FontStyles.Subtitle2}>{`#${nft.index}`}</Text>} />
      <View style={styles.content}>


        <View style={styles.buttonContainer}>
          <Button
            variant="gray"
            text="Marketplace"
            onPress={() => null}
          />
          <RainbowButton
            text="Send"
            onPress={() => null}
          />
        </View>


        <Section title='🧩 Collection'>
          <Badge value={nft?.collection} icon={null/*collection?.icon*/} />
          <Badge value={`#${nft?.index}`} />
        </Section>
        {!!nft?.desc && (
          <Section title='📝 Description'>
            <Text>{nft?.desc}</Text>
          </Section>
        )}
        {nft?.metadata?.properties?.length && (
          <Section title='🎛 Attributes'>
            {
              nft?.metadata?.properties?.map((prop) => (
                <Badge
                  name={prop.name}
                  value={prop.value}
                />
              ))
            }
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


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
import Button from '../../components/buttons/Button';
import RainbowButton from '../../components/buttons/RainbowButton';
import styles from './styles';
import NftDisplayer from '../../components/common/NftDisplayer';

const MOCK = {
  "index": "9244",
  "canister": "qcg3w-tyaaa-aaaah-qakea-cai",
  "url": "https://api.openpay.mx/barcode/185017437691737?width=1&height=100",
  "name": 'ICPunk #9244',
  "metadata": {
    "id": "9244",
    "url": "/Token/9244",
    "owner": { "_arr": { "0": 195, "1": 147, "2": 158, "3": 29, "4": 131, "5": 177, "6": 153, "7": 14, "8": 3, "9": 66, "10": 224, "11": 193, "12": 37, "13": 209, "14": 200, "15": 144, "16": 18, "17": 98, "18": 37, "19": 163, "20": 92, "21": 216, "22": 65, "23": 149, "24": 227, "25": 220, "26": 242, "27": 199, "28": 2 }, "_isPrincipal": true },
    "desc": "",
    "name": "ICPunk #9244",
    "properties": [{ "value": "Yellow", "name": "Background" },
    { "value": "Red Hoodie", "name": "Body" },
    { "value": "Red", "name": "Nose" },
    { "value": "None", "name": "Mouth" },
    { "value": "None", "name": "Eyes" },
    { "value": "Green Angry", "name": "Head" },
    { "value": "Red Cap", "name": "Top" }]
  },
  "standard": "ICPunks",
  "collection": "ICPunks"
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


        <NftDisplayer url={nft.url} />

        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Button
              variant="gray"
              text="Marketplace"
              onPress={() => null}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <RainbowButton
              text="Send"
              onPress={() => null}
            />
          </View>
        </View>


        <Section title='🧩 Collection' style={{ borderTopWidth: 0 }}>
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


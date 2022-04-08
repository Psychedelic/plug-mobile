import { View, Text, Share } from 'react-native';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

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
import Send from '../Send';

const NftDetail = ({ modalRef, handleClose, selectedNFT, ...props }) => {
  const isCapCrowns = selectedNFT?.collection === 'CAP Crowns';
  const [type, setType] = useState(null);
  const userCollection = useSelector(state => state.user.collections) || [];
  const selectedCollection = userCollection.find(
    collection => collection.name === selectedNFT?.collection,
  );

  useGetType(selectedNFT?.url, setType);

  const handleShare = () => {
    /* TODO: Change the link for the correct NFT View Page when it's ready */
    const nftName = `${selectedNFT?.collection} #${selectedNFT?.index}`;
    Share.share({
      message: `${nftName}: ${selectedNFT?.url}`,
      url: selectedNFT?.url,
      title: nftName,
    });
  };

  const sendRef = useRef(null);

  const handleSend = () => {
    sendRef.current?.open();
  };

  return (
    <>
      <Modal
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalRef={modalRef}
        onClose={handleClose}
        {...props}>
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
              <Button variant="gray" text="Share" onPress={handleShare} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <RainbowButton
                text="Send"
                onPress={handleSend}
                disabled={isCapCrowns}
              />
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
      <Send
        modalRef={sendRef}
        nft={selectedNFT}
        onSuccess={() => modalRef.current?.close()}
      />
    </>
  );
};

export default NftDetail;

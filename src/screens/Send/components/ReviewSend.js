import React, { useState } from 'react';
import Modal from '../../../components/modal';
import { FontStyles } from '../../../constants/theme';
import Header from '../../../components/common/Header';
import { StyleSheet, Text, View } from 'react-native';
import Column from '../../../components/layout/Column';
import Row from '../../../components/layout/Row';
import TokenIcon from '../../../components/tokens/TokenIcon';
import RainbowButton from '../../../components/buttons/RainbowButton';
import UserIcon from '../../../components/common/UserIcon';
import Icon from '../../../components/icons';
import Button from '../../../components/buttons/Button';

const ReviewSend = ({ modalRef, token, amount,
  value, to, onClose, ...props }) => {

  const [confirmed, setConfirmed] = useState(false);

  const handleClose = () => {
    if (confirmed) {
      onClose();
    }
  };

  return (
    <Modal modalRef={modalRef} onClose={handleClose} {...props}>
      <View style={styles.content}>
        <Header
          center={
            <Text style={FontStyles.Subtitle2}>
              {
                confirmed
                  ? 'Confirmed'
                  : 'Review Send'
              }
            </Text>
          }
        />

        {
          confirmed
          && <Icon name='confirm' style={{ alignSelf: 'center', marginBottom: 30 }} />
        }


        <Row style={styles.row}>
          <Column>
            <Text style={FontStyles.Title2}>$872.19</Text>
            <Text style={FontStyles.Subtitle3}>20.12 ICP</Text>
          </Column>
          <TokenIcon {...token} color='#292929' />
        </Row>

        <Row style={[styles.row, { paddingRight: 9 }]}>
          <View style={styles.to}>
            <Text style={FontStyles.Normal}>To</Text>
          </View>
          <Icon name='arrowDown' />
        </Row>

        <Row style={styles.row}>
          <Column>
            <Text style={FontStyles.Title2}>Frank</Text>
            <Text style={FontStyles.Subtitle3}>qweqwe...qwe</Text>
          </Column>
          <UserIcon size='medium' icon='🔥' />
        </Row>


        {
          confirmed
            ?
            <Button
              variant="gray"
              text="View on Explorer"
              buttonStyle={styles.button}
              onPress={() => setConfirmed(!confirmed)}
            />
            :
            <RainbowButton
              text='􀎽 Hold to Send'
              onLongPress={() => setConfirmed(!confirmed)}
              buttonStyle={styles.button}
            />
        }

      </View>
    </Modal>
  )
}

export default ReviewSend;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  row: {
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  to: {
    borderRadius: 8,
    backgroundColor: '#292929',
    width: 41,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 45,
    marginTop: 25
  }
})
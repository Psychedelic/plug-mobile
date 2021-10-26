import React from 'react';
import Divider from '../../components/common/Divider';
import GradientText from '../../components/common/GradientText';
import InfoWithActions from '../../components/common/InfoWithActions';
import Column from '../../components/layout/Column';
import Modal from '../../components/modal';
import { Colors } from '../../constants/theme';
import { Text, View } from 'react-native';
import styles from './styles';
import { FontStyles } from '../../constants/theme';
import Row from '../../components/layout/Row';
import Header from '../../components/common/Header';

const Deposit = ({ modalRef }) => {
  return (
    <Modal
      modalRef={modalRef}
      adjustToContentHeight
    >
      <Header center={<Text style={FontStyles.Subtitle2}>Deposit</Text>} />

      <Column style={styles.container}>

        <GradientText
          colors={[Colors.Rainbow.Teal, Colors.Rainbow.Green]}
          style={styles.title}
        >
          {'Principal ID'}
        </GradientText>
        <Text style={styles.text}>
          Use when receiving from Plug accounts & users,
          or other apps that support sending directly to Principal ID's.
        </Text>

        <InfoWithActions
          text={'principal here'}
          actions={[
            {
              icon: 'copy',
              onPress: () => null
            },
          ]}
          colors={[
            Colors.Rainbow.Teal,
            Colors.Rainbow.Green
          ]}
        />


      </Column>

      <Row>
        <View style={{ ...styles.divider, marginRight: 'auto' }}>
          <Divider />
        </View>

        <Text style={FontStyles.Subtitle3}>OR</Text>

        <View style={{ ...styles.divider, marginLeft: 'auto' }}>
          <Divider />
        </View>
      </Row>


      <Column style={styles.container}>

        <GradientText
          colors={[Colors.Rainbow.Purple, Colors.Rainbow.Blue]}
          style={styles.title}
        >
          {'Account ID'}
        </GradientText>

        <Text style={styles.text}>
          Use when receiving from exchanges,
          or other apps that only support sending to Accounts ID's.
        </Text>

        <InfoWithActions
          text={'account id here'}
          actions={[
            {
              icon: 'copy',
              onPress: () => null
            },
          ]}
          colors={[
            Colors.Rainbow.Purple,
            Colors.Rainbow.Blue
          ]}
        />

      </Column>

    </Modal >
  );
}

export default Deposit;

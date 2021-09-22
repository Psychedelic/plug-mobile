import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '../../components/Container';
import Divider from '../../components/Divider';
import Header from '../../components/Header';
import { FontStyles, Metrics } from '../../constants/theme';
import Icon from '../../components/icons/Icon';
import UserIcon from '../../components/UserIcon';
import Button from '../../components/buttons/Button';

import ActivityItem from './components/ActivityItem';

const ACTIVITY = [
  {
    amount: 0.00001234,
    value: 0.0007259622,
    image: 'Dfinity.svg',
    type: 1,
    date: '2021-09-07T21:47:50.154Z',
    status: 0,
    to: 'd964914e21739344d359c71e4a27926f4c03b7a5c3e6769d0b7ea32ff1fa18d8',
    plug: null,
    from: 'd129a209d90b5c1c8171ef643db9548f45d991bbb8de9dad43a403a6ab2713e2',
    hash: '6fffdb9fcc7847a368436a55eaf7f74bc76bf8c391a6899d0750b94c358d6232',
    symbol: 'ICP',
  },
  {
    amount: 0.000002,
    value: 0.00000285312,
    image: 'XTC.svg',
    type: 4,
    date: '2021-09-07T20:32:03.161Z',
    status: 0,
    to: 'aanaa-xaaaa-aaaah-aaeiq-cai',
    plug: null,
    from: 'hes2n-2pjrc-wnm7e-6acff-yy3wo-otw2l-nebk7-go2ky-dmzfo-gva5j-6qe',
    hash: '1768',
    symbol: 'XTC',
  },
  {
    amount: 0.00001,
    value: 0.0005883,
    image: 'Dfinity.svg',
    type: 0,
    date: '2021-09-07T19:09:38.724Z',
    status: 0,
    to: '8c6ea62153434b7f544bab9d4db982c9f2856e196728e03d619e2cd274117533',
    plug: null,
    from: 'd964914e21739344d359c71e4a27926f4c03b7a5c3e6769d0b7ea32ff1fa18d8',
    hash: '7302030701ebc92738028e3d65b5eecfc5d71bf636f956b7694ee06ce3e8276b',
    symbol: 'ICP',
  },
  {
    amount: 0.005,
    value: 0.29415,
    image: 'Dfinity.svg',
    type: 0,
    date: '2021-09-07T15:04:45.376Z',
    status: 0,
    to: '8c6ea62153434b7f544bab9d4db982c9f2856e196728e03d619e2cd274117533',
    plug: null,
    from: 'd964914e21739344d359c71e4a27926f4c03b7a5c3e6769d0b7ea32ff1fa18d8',
    hash: '3f8b0d38a06253ad610857955885ff77b90f3b190f7ec6f7582f655739e3f629',
    symbol: 'ICP',
  },
  {
    amount: 0.00001234,
    value: 0.0007259622,
    image: 'Dfinity.svg',
    type: 1,
    date: '2021-09-06T20:12:50.692Z',
    status: 0,
    to: 'd964914e21739344d359c71e4a27926f4c03b7a5c3e6769d0b7ea32ff1fa18d8',
    plug: null,
    from: '8c6ea62153434b7f544bab9d4db982c9f2856e196728e03d619e2cd274117533',
    hash: '678153571cbf05093f0dea2acb117b04e894b57bef4763d7ee73b821fe246671',
    symbol: 'ICP',
  },
  {
    amount: 0.0001,
    value: 0.005883,
    image: 'Dfinity.svg',
    type: 1,
    date: '2021-09-02T19:02:28.277Z',
    status: 0,
    to: 'd964914e21739344d359c71e4a27926f4c03b7a5c3e6769d0b7ea32ff1fa18d8',
    plug: null,
    from: '8c6ea62153434b7f544bab9d4db982c9f2856e196728e03d619e2cd274117533',
    hash: '00cb3dad96ed8af8aeefa1dffccd287e0505b3204f1e3fac1b8fea17a4937739',
    symbol: 'ICP',
  },
  {
    amount: 0.001,
    value: 0.05883,
    image: 'Dfinity.svg',
    type: 1,
    date: '2021-09-02T18:55:59.625Z',
    status: 0,
    to: 'd964914e21739344d359c71e4a27926f4c03b7a5c3e6769d0b7ea32ff1fa18d8',
    plug: null,
    from: '8c6ea62153434b7f544bab9d4db982c9f2856e196728e03d619e2cd274117533',
    hash: '90996c6fa796940b1be423e011ea5b64fb9636c0cb2b51116b70d6eb6afaa57e',
    symbol: 'ICP',
  },
  {
    amount: 0.0001,
    value: 0.005883,
    image: 'Dfinity.svg',
    type: 1,
    date: '2021-09-02T15:46:02.194Z',
    status: 0,
    to: 'd964914e21739344d359c71e4a27926f4c03b7a5c3e6769d0b7ea32ff1fa18d8',
    plug: null,
    from: 'b9ed318ed0b7f22126813caa8fc4a2b264e12858c612da0ef8cd398932c25fec',
    hash: '53f0000baa4a21ff51150f070c2253645ff2912c2857c233caa12cf893551b00',
    symbol: 'ICP',
  },
  {
    amount: 0.01,
    value: 0.5883,
    image: 'Dfinity.svg',
    type: 0,
    date: '2021-09-02T15:44:27.753Z',
    status: 0,
    to: '8c6ea62153434b7f544bab9d4db982c9f2856e196728e03d619e2cd274117533',
    plug: null,
    from: 'd964914e21739344d359c71e4a27926f4c03b7a5c3e6769d0b7ea32ff1fa18d8',
    hash: '640aa1c0184ae9efd86553913afe3444cb18b0d708cd24b81336e3be1bf47961',
    symbol: 'ICP',
  },
  {
    amount: 0.01,
    value: 0.5883,
    image: 'Dfinity.svg',
    type: 0,
    date: '2021-09-02T15:44:04.121Z',
    status: 0,
    to: 'b9ed318ed0b7f22126813caa8fc4a2b264e12858c612da0ef8cd398932c25fec',
    plug: null,
    from: 'd964914e21739344d359c71e4a27926f4c03b7a5c3e6769d0b7ea32ff1fa18d8',
    hash: '7ff1bfe451cd171ff967d8fb1c2c776d9dd96ae6d8bb8a5ebb2b24de68a9de03',
    symbol: 'ICP',
  },
  {
    amount: 0.00001,
    value: 0.0005883,
    image: 'Dfinity.svg',
    type: 0,
    date: '2021-08-31T16:41:03.293Z',
    status: 0,
    to: 'b1bfafe4a3c4d4e15568179bb88700bbc60e784d9b988469945e66caa9159070',
    plug: null,
    from: 'd964914e21739344d359c71e4a27926f4c03b7a5c3e6769d0b7ea32ff1fa18d8',
    hash: 'aa3cb4e43a24d1421856f936906aee9cd857cdae6c1cad35f80e9d8ca424b499',
    symbol: 'ICP',
  },
];

const header = {
  left: (
    <TouchableOpacity>
      <Icon name="gear" />
    </TouchableOpacity>
  ),
  center: null,
  right: (
    <TouchableOpacity>
      <Icon name="chevronRight" />
    </TouchableOpacity>
  ),
};

const Profile = () => (
  <Container>
    <Header {...header} />
    <ScrollView>
      <View style={styles.container}>
        <UserIcon size="big" icon="🔥" />
        <Button
          variant="gray"
          text="Change"
          buttonStyle={{ width: 90 }}
          textStyle={{ fontSize: 16 }}
        />
      </View>

      <Divider />

      <Text style={styles.title}>Activity</Text>

      <View>
        {ACTIVITY.map((item, index) => (
          <ActivityItem key={index} {...item} />
        ))}
      </View>
    </ScrollView>
  </Container>
);

export default Profile;

const styles = StyleSheet.create({
  title: {
    paddingVertical: Metrics.Padding,
    paddingHorizontal: Metrics.Padding,
    ...FontStyles.Title,
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: Metrics.Padding,
    paddingBottom: Metrics.Padding,
  },
});

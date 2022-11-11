import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';

import CopiedToast from '@/commonComponents/CopiedToast';
import GradientText from '@/commonComponents/GradientText';
import Text from '@/commonComponents/Text';
import { Column } from '@/layout';
import { useAppSelector } from '@/redux/hooks';
import shortAddress from '@/utils/shortAddress';

import { getIdInfo } from '../../constants';
import InfoWithActions from '../InfoWithActions';
import styles from './styles';

function IDDetails({ idType }) {
  const [visibility, setVisibility] = useState(false);
  const { currentWallet } = useAppSelector(state => state.keyring);
  const { principal, accountId } = currentWallet || {};
  const { description, id, colors } = getIdInfo(principal, accountId, idType);

  const handleOnPress = () => {
    Clipboard.setString(`${id}`);
    setVisibility(true);
  };

  useEffect(() => {
    return () => setVisibility(false);
  }, []);

  return (
    <Column style={styles.container}>
      <GradientText colors={colors} style={styles.title}>
        {idType}
      </GradientText>
      <Text style={styles.text}>{description}</Text>
      <InfoWithActions
        text={shortAddress(id, { leftSize: 10, rightSize: 15 })}
        actions={[{ icon: 'copy', onPress: handleOnPress }]}
        colors={colors}
      />
      <CopiedToast
        visibility={visibility}
        setVisibility={setVisibility}
        customStyle={styles.toastStyle}
        customPointerStyle={styles.toastPointerStyle}
      />
    </Column>
  );
}

export default IDDetails;

import React from 'react';
import { useTranslation } from 'react-i18next';

import Text from '@/components/common/Text';
import { Row, Separator } from '@/layout';

import styles from './styles';

function DepositDivider() {
  const { t } = useTranslation();
  return (
    <Row>
      <Separator style={styles.divider} />
      <Text style={styles.text}>{t('common.or')}</Text>
      <Separator style={styles.divider} />
    </Row>
  );
}

export default DepositDivider;

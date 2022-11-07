import i18next from 'i18next';
import React, { RefObject } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { SvgProps } from 'react-native-svg';

import { isAndroid } from '@/constants/platform';
import Close from '@/icons/material/Close.svg';
import { Nullable } from '@/interfaces/general';

import Text from '../Text';
import Touchable from '../Touchable';
import styles, { ICON_COLOR, ICON_COLOR_DESTRUCTIVE } from './styles';

export interface Option {
  id: number | string;
  label: string;
  onPress: () => void;
  destructive?: boolean;
  icon?: Nullable<React.FC<SvgProps>>;
}

interface Props {
  modalRef: RefObject<Modalize>;
  options?: Option[];
  onClose?: () => void;
  showIcons?: boolean;
  subtitle?: string;
  title?: string;
  cancelTextStyle?: StyleProp<TextStyle>;
  optionTextStyle?: StyleProp<TextStyle>;
}

function ActionSheet({
  modalRef,
  onClose,
  title,
  subtitle,
  options,
  showIcons = isAndroid,
  optionTextStyle,
  cancelTextStyle,
}: Props) {
  const handleClose = () => {
    modalRef?.current?.close();
    onClose?.();
  };

  const handleItemPress = (option: Option) => {
    option?.onPress();
    handleClose();
  };

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        withHandle={false}
        adjustToContentHeight
        modalStyle={styles.modal}>
        <View>
          <View style={styles.topContainer}>
            {(title || subtitle) && (
              <View style={styles.titleContainer}>
                {title && <Text style={styles.title}>{title}</Text>}
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              </View>
            )}
            {options?.map(({ icon: Icon, ...option }, index) => (
              <Touchable
                key={option.id}
                onPress={() => handleItemPress(option)}
                style={[styles.item, index > 0 && styles.itemBorder]}>
                {showIcons && Icon && (
                  <Icon
                    fill={
                      option.destructive ? ICON_COLOR_DESTRUCTIVE : ICON_COLOR
                    }
                    style={styles.icon}
                  />
                )}
                <Text
                  type="body2"
                  style={[
                    styles.itemText,
                    optionTextStyle,
                    option.destructive && styles.destructiveText,
                  ]}>
                  {option.label}
                </Text>
              </Touchable>
            ))}
          </View>
          <Touchable
            onPress={handleClose}
            style={[styles.item, styles.cancelContainer]}>
            {showIcons && <Close fill={ICON_COLOR} style={styles.icon} />}
            <Text
              type="body2"
              style={[styles.itemText, styles.cancelText, cancelTextStyle]}>
              {i18next.t('common.cancel')}
            </Text>
          </Touchable>
        </View>
      </Modalize>
    </Portal>
  );
}

export default ActionSheet;

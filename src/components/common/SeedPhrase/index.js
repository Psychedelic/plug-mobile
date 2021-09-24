import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';
import { styles } from '../../buttons/RainbowButton/styles';

const SeedPhrase = ({ mnemonic }) => {
  const [reveal, setReveal] = useState(false);

  return (
    <View style={styles.container}>
      {
        mnemonic.map((word, i) => (
          <div className={classes.item} key={word}>
            <ListItem number={i + 1} text={word} />
          </div>
        ))
      }
    </View>
  )
};

export default SeedPhrase;

const styles = StyleSheet.create({
  container:{
    backgroundColor: Colors
  }
});

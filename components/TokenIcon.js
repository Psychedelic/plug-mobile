import React from 'react';

const TokenIcon = ({ icon, symbol, color, customStyle, ...props }) => {
    return icon
        ?? <View
            style={[
                styles.genericToken,
                customStyle,
                { backgroundColor: `rgb(${color.values.rgb.join(',')})` }
            ]}
            {...props}
        >
            <Text style={styles.text}>{symbol}</Text>
        </View>
}

export default TokenIcon;

const styles = StyleSheet.create({
    genericToken: {
        width: 41,
        height: 41,
        textAlign: 'center',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 10,
        fontWeight: 'bold',
    }
});

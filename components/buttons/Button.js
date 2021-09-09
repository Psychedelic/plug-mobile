import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ text, onPress, variant, customStyle, }) => {

    const { buttonStyle, textStyle } = variants[variant];

    return (
        <WithRainbowGradient variant={variant} customStyle={customStyle}>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.button, buttonStyle, variant !== 'rainbow' && customStyle]}
            >
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </TouchableOpacity>
        </WithRainbowGradient>
    )
}

export default Button;


const WithRainbowGradient = ({ variant, children, customStyle }) => (
    variant === "rainbow"
        ? (<LinearGradient
            style={[styles.button, styles.buttonRainbow, customStyle]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['rgb(255, 231, 1)', 'rgb(250, 81, 211)', 'rgb(16, 217, 237)', 'rgb(82, 255, 83)']}
        >
            {children}
        </LinearGradient>)
        : children
);


const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        width: '100%',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonRainbow: {},
    buttonGray: {
        backgroundColor: '#33343A'
    },
    textRainbow: {
        color: '#FFFFFF'
    },
    textGray: {
        color: '#FFFFFF'
    }

});

const variants = {
    rainbow: {
        buttonStyle: styles.buttonRainbow,
        textStyle: styles.textRainbow
    },
    gray: {
        buttonStyle: styles.buttonGray,
        textStyle: styles.textGray
    }
}

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Rainbow } from '../../constants/theme';
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
            start={Rainbow.start}
            end={Rainbow.end}
            colors={Rainbow.colors}
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
        backgroundColor: Colors.Gray.Primary,
    },
    textRainbow: {
        color: Colors.White.Pure,
    },
    textGray: {
        color: Colors.White.Pure,
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

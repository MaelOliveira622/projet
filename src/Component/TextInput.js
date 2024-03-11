import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({value, onChangeText, placeholder, secureTextEntry}) => {
    return(
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
})

export default CustomTextInput;
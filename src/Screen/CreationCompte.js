import React, {useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../Component/TextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper';

const CreationCompte = () => {

    const [textEmail, setTextEmail] = useState('');
    const [textPassword, setTextPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Admin', value: 'Admin'},
        {label: 'Super-Admin', value: 'Super-Admin'},
    ]);


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <CustomTextInput
                    value={textEmail}
                    onChangeText={setTextEmail}
                    placeholder="Email"
                />
                <CustomTextInput
                    value={textPassword}
                    onChangeText={setTextPassword}
                    placeholder="Mot de passe"
                />    

                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    />

<Button style={styles.button} onPress={() => console.log("Pressed")}>
    Valider
</Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 
    button: {
        marginTop: 10,
        backgroundColor: '#03989E',
    }
});

export default CreationCompte;
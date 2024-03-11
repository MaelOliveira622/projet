import React, {useState} from "react";
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function Notification({navigation}) {

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Searchbar 
            placeholder="Rechercher"
            onChangeText={setSearchQuery}
            value={searchQuery}            
            />
            <Text>Recherche Page</Text>
        </View>
    )
}    
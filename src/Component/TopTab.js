import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Desactivation from '../Desac/Desactivation';
import Reactivation from '../Desac/Reactivation';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
    return (
       <SafeAreaView style={{flex: 1}}>  
        <Tab.Navigator initialRouteName="Desactivation">
            <Tab.Screen name="Desactivation" component={Desactivation} />
            <Tab.Screen name="Reactivation" component={Reactivation} />
        </Tab.Navigator>
      </SafeAreaView>  
    );
};

export default TopTab;
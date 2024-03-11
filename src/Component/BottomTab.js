// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Fontisto } from '@expo/vector-icons';
import Home from '../Screen/Home';
import Notification from '../Screen/Notification';
import Settings from '../Screen/Settings';
import Recherche from '../Screen/Recherche';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} />,
      }}
    />  
      <Tab.Screen 
        name="Recherche" 
        component={Recherche} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <Fontisto name='search' color={color} size={size}/>,}}/>
      <Tab.Screen 
        name="Notification" 
        component={Notification} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <FontAwesome name='bell' color={color} size={size}/>,}}/>
      <Tab.Screen 
        name='Settings' 
        component={Settings}
        options={{
          headerShown: false, 
          tabBarIcon: ({color, size}) => <FontAwesome name='gear' color={color} size={size}/>, 
        }}
      />  
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

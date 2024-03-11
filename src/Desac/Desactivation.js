import React from 'react';
import { View, Text } from 'react-native';
import Compte from '../Component/Compte';

const Desactivation = () => {
    return (
        <View>
            <Text>Desactivation Screen</Text>
            <Compte 
                userProfileImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/Wec/Drapeau/Qatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWMvRHJhcGVhdS9RYXRhci5wbmciLCJpYXQiOjE3MTAwODIyMzUsImV4cCI6MTc0MTYxODIzNX0.YaEIw4lQbpigve1KIYZHmdGf9zOMSC0dv-5mHzUFY-A&t=2024-03-10T14%3A50%3A35.728Z"
                Username="Username"
            />
            <Compte 
                userProfileImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/Wec/Drapeau/Qatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWMvRHJhcGVhdS9RYXRhci5wbmciLCJpYXQiOjE3MTAwODIyMzUsImV4cCI6MTc0MTYxODIzNX0.YaEIw4lQbpigve1KIYZHmdGf9zOMSC0dv-5mHzUFY-A&t=2024-03-10T14%3A50%3A35.728Z"
                Username="Username"
            />
        </View>
    );
};

export default Desactivation;
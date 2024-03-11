import React from 'react';
import { View, Text, Image } from 'react-native';
import Post from '../Component/Post';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function PostDetail({ route }) {
  const { userProfileImage, username, messageContent, postImage } = route.params;

  return (
    <View>
    <BottomSheetModalProvider> 
      {/** Post */}
        <Post
            userProfileImage={userProfileImage}
            username={username}
            messageContent={messageContent}
            postImage={postImage}
        />

        <View style={{borderBottomWidth: 1, borderBottomColor: "black", marginVertical: 10}}></View>

      {/** Commentaires */}
        <Post
          userProfileImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/Wec/Drapeau/Qatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWMvRHJhcGVhdS9RYXRhci5wbmciLCJpYXQiOjE3MDk0MTQ1MTksImV4cCI6MTc0MDk1MDUxOX0.YEM3rLotJ4D-cUeqVgtkqcn9JbenD-TojSZlPh0cR7I&t=2024-03-02T21%3A21%3A59.026Z"
          username="Test"
          messageContent="Woah pas mal le commentaire"
        />  
    </BottomSheetModalProvider>         
    </View>
  )
}
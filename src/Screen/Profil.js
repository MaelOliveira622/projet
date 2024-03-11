import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../Component/Post';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';

const Profil = ({route}) => {
    const username = route.params.username;
    const photoProfil = route.params.userProfileImage;

    const relation = () => {
      console.log("AHAHAH")
    }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <SafeAreaView style={styles.container}>
      <BottomSheetModalProvider>
        <ScrollView>
      <View>
        <Image
          source={{uri: photoProfil}}
          style={styles.photoProfil}
        />
        <Text style={styles.username}>{username}</Text>
        <Button title='AHAH' onPress={relation}/>
      </View>
      <View style={styles.post}>
        <Post
          userProfileImage={photoProfil}
          username={username}
          messageContent="Lorem ipsum dolor sit amet. Sit numquam quas rem dolorem placeat vel molestiae quas. Est voluptatem ipsa aut minima dolore qui dolorem libero eos recusandae quidem.

          Eos doloremque explicabo est reprehenderit odio rem molestiae asperiores ut unde assumenda. Ut iure obcaecati ut nemo possimus et nobis vitae non dolores repellendus. Et architecto ullam eos fugit necessitatibus ut error fugit.
          
          Est possimus voluptatem sed doloribus nobis 33 reiciendis repudiandae aut consequatur rerum qui enim suscipit? Eos maxime esse ea numquam laboriosam sed labore amet At dolores galisum et dolorum quam. Ut odit quod vel accusantium totam est aspernatur consequatur aut suscipit ipsa non rerum repellat vel nihil dolorem."
          postImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/Wec/Drapeau/Qatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWMvRHJhcGVhdS9RYXRhci5wbmciLCJpYXQiOjE3MDk0MDE3NzcsImV4cCI6MTc0MDkzNzc3N30.kUlhy0jX53RW9qbwFKQFk8sS3YR22RvkRAA-a8UyLsM&t=2024-03-02T17%3A49%3A37.122Z"
        />
        <Post
          userProfileImage={photoProfil}
          username={username}
          messageContent="Lorem ipsum dolor sit amet. Sit numquam quas rem dolorem placeat vel molestiae quas. Est voluptatem ipsa aut minima dolore qui dolorem libero eos recusandae quidem.

          Eos doloremque explicabo est reprehenderit odio rem molestiae asperiores ut unde assumenda. Ut iure obcaecati ut nemo possimus et nobis vitae non dolores repellendus. Et architecto ullam eos fugit necessitatibus ut error fugit.
          
          Est possimus voluptatem sed doloribus nobis 33 reiciendis repudiandae aut consequatur rerum qui enim suscipit? Eos maxime esse ea numquam laboriosam sed labore amet At dolores galisum et dolorum quam. Ut odit quod vel accusantium totam est aspernatur consequatur aut suscipit ipsa non rerum repellat vel nihil dolorem."
          postImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/Wec/Drapeau/Qatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWMvRHJhcGVhdS9RYXRhci5wbmciLCJpYXQiOjE3MDk0MDE3NzcsImV4cCI6MTc0MDkzNzc3N30.kUlhy0jX53RW9qbwFKQFk8sS3YR22RvkRAA-a8UyLsM&t=2024-03-02T17%3A49%3A37.122Z"
        />
      </View>
      </ScrollView>
      </BottomSheetModalProvider>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoProfil: {
    width: 100, 
    height: 100, 
    borderRadius: 50,
    alignSelf: 'center',
  }, 
  username: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  post: {
    marginTop: 20,
  },
});

export default Profil;

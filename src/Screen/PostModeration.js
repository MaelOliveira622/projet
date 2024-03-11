import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostModerationComponent from '../Component/PostModerationComponent';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function PostModeration() {

    const buttonOk = () => {
        //Permettra d'envoyer le post dans le home des gens 
        console.log("Hello world"); 
    }

    const buttonDelete = () => {
        //Supprimer le poste (avec une raison ?)
        console.log("Bye World")
    }

  return (
        <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
            <BottomSheetModalProvider>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <PostModerationComponent
                        userProfileImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/Wec/Drapeau/France.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWMvRHJhcGVhdS9GcmFuY2UucG5nIiwiaWF0IjoxNzA5MzI1MzQ5LCJleHAiOjE3NDA4NjEzNDl9.PuPNMINa6875tltDkTMvR2heME5Jt-xMb7_PFY1a_MI&t=2024-03-01T20%3A35%3A49.464Z"
                        username="AHAHA"
                        messageContent="HFHFHF"
                        date={"4h"}
                        onOkButton={buttonOk}
                        onDeleteButton={buttonDelete}
                    />
                    <PostModerationComponent
                        userProfileImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/Wec/Drapeau/France.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWMvRHJhcGVhdS9GcmFuY2UucG5nIiwiaWF0IjoxNzA5MzI1MzQ5LCJleHAiOjE3NDA4NjEzNDl9.PuPNMINa6875tltDkTMvR2heME5Jt-xMb7_PFY1a_MI&t=2024-03-01T20%3A35%3A49.464Z"
                        username="AHAHAJHDGFKJSDHFKHSDKF"
                        messageContent="Lorem ipsum dolor sit amet. Et accusantium quas est ratione dignissimos sit enim explicabo et fugiat nobis ab possimus eius sit esse iste ut libero optio. Et fuga odit ex quidem nesciunt aut eveniet quasi eum corporis voluptatem 33 praesentium consectetur. Aut fugit minus in sapiente quae sed architecto sapiente hic culpa illo in eligendi error et facere omnis. Ea deserunt doloribus et aliquam quos ut maiores dolorum non minima amet At molestiae officiis.

                        Qui quia facere sit placeat dolore ut consectetur dolor et error dolor ut doloribus omnis et dolorem molestias. Aut libero saepe in similique quis et repellendus nostrum non suscipit eaque aut officia sapiente et officiis itaque ut dolor voluptates. Sed excepturi quos vel consequatur voluptatem ex galisum voluptas qui omnis blanditiis hic excepturi laboriosam. Vel doloremque fugit et omnis minus qui saepe repudiandae et iure earum et dolorum quia non repellat repellat?
                        
                        Aut molestiae minus et quod cupiditate in repellendus dolor. In doloremque ipsa eum consequatur atque qui fugit enim id quia quia vel dolores quibusdam. Ad repellat enim a cumque odit At architecto modi qui itaque enim est cupiditate autem ut tenetur voluptatem quo voluptatem sunt."
                        date={"4h"}
                        onOkButton={buttonOk}
                        onDeleteButton={buttonDelete}
                    />
                    <PostModerationComponent
                        userProfileImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/Wec/Drapeau/France.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWMvRHJhcGVhdS9GcmFuY2UucG5nIiwiaWF0IjoxNzA5MzI1MzQ5LCJleHAiOjE3NDA4NjEzNDl9.PuPNMINa6875tltDkTMvR2heME5Jt-xMb7_PFY1a_MI&t=2024-03-01T20%3A35%3A49.464Z"
                        username="AHAHA"
                        messageContent="HFHFHF"
                        date={"4h"}
                        onOkButton={buttonOk}
                        onDeleteButton={buttonDelete}
                    />
                </ScrollView>    
            </BottomSheetModalProvider>
        </SafeAreaView>
        </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: -40,
    },
    scrollViewContent: {
        //justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    // logo: {
    //     width: 400,
    //     height: 30,
    //     alignItems: 'center',
    //     marginBottom: 80,
    // }, 
    icon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});

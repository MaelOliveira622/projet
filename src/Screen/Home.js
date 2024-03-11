import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import LogoComponent from '../Component/Logo';
import Post from '../Component/Post';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Entypo } from '@expo/vector-icons';

export default function Home({navigation}) {
    const Publier = () => navigation.navigate("Publier")
    return (
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaView style={styles.container}>
           <BottomSheetModalProvider>
          <LogoComponent style={styles.logo} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Post
                    userProfileImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/F1/Flags/Italie.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJGMS9GbGFncy9JdGFsaWUucG5nIiwiaWF0IjoxNzA4MDA3OTg3LCJleHAiOjE3MDg2MTI3ODd9.36b9Hn0ZLllmsv_ooNj6JN0aglsHzXxio2syrQCWPlM&t=2024-02-15T14%3A39%3A47.311Z"
                    username="NomUtilisateur"
                    messageContent="AHAHAHAHAHA"
                    postImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/F1/Circuit/Imola.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJGMS9DaXJjdWl0L0ltb2xhLnBuZyIsImlhdCI6MTcwODAwODg0NiwiZXhwIjoxNzA4NjEzNjQ2fQ.-HBO_DqJsbZL9f_qaBTVxoMmgq-D87x2hwx4OJrCWOo&t=2024-02-15T14%3A54%3A06.756Z"
                    date={"•7h"}
                />
                <Post
                    userProfileImage="https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/Wec/Drapeau/Belgique.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWMvRHJhcGVhdS9CZWxnaXF1ZS5wbmciLCJpYXQiOjE3MDg3OTc3NDMsImV4cCI6MTc0MDMzMzc0M30.PcWhdTkDNu10FDeoi9ywBX_lgflSskZy443_L4K59EA&t=2024-02-24T18%3A02%3A19.933Z"
                    username="BelgiumRacing"
                    messageContent="Lorem ipsum dolor sit amet. Eos velit libero eum voluptatibus quibusdam 33 dolore inventore ea nesciunt delectus sed sapiente adipisci aut quaerat obcaecati? Et amet inventore aut aperiam dolorem ut voluptas suscipit ea galisum accusantium sit ipsa ullam non nesciunt doloremque. In ducimus omnis eum repellat quis ea quia quos quo dolor maiores et suscipit sunt ut saepe iure aut voluptatibus aperiam.

                    Aut minus velit et vero dicta et quia omnis vel vero doloribus ut modi inventore. Ab excepturi laudantium ea rerum fuga qui voluptas fuga ea quos deserunt.
                    
                    Hic fuga sapiente et omnis dolores ut harum minima At amet doloribus qui minima dolores sed illum corporis. Est eaque numquam eum quibusdam tenetur ea illo quidem et molestiae maiores vel debitis quisquam et aliquam internos id galisum nihil.r isdhfsdhfjhsdifjhskjfhsjkdfhksdhfshf lsdkgbdfkbgksfdbgkjfdgbfdg"
                    date={"•1j"}
                />
            </ScrollView>
                <Entypo name="circle-with-plus" size={40} color="blue" style={styles.icon} onPress={Publier}/>   
            </BottomSheetModalProvider> 
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    scrollViewContent: {
        //justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    logo: {
        width: 400,
        height: 30,
        alignItems: 'center',
        marginBottom: 80,
    }, 
    icon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});
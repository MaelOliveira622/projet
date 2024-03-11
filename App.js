import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screen/Login'
import Inscription from "./src/Screen/Inscription";
import BottomTabNavigator from './src/Component/BottomTab';
import Favoris from './src/Screen/Favoris';
import MotDePasseOublieScreen from './src/Screen/MotDePasseOublie';
import Publier from './src/Screen/Publier';
import PostDetail from './src/Screen/PostDetail';
import Profil from './src/Screen/Profil';
import PostModeration from './src/Screen/PostModeration';
import CreationCompte from './src/Screen/CreationCompte';
import Statistique from './src/Screen/Statistique';
import TopTab from './src/Component/TopTab';
import Filtre from './src/Screen/Filtre';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name= 'Login' component={Login} />
            <Stack.Screen options={{headerShown: false}} name= 'Inscription' component={Inscription} />
            <Stack.Screen options={{headerShown: false}} name= 'MotDePasseOublie' component={MotDePasseOublieScreen} />
            <Stack.Screen options={{headerShown: false}} name= 'BottomTab' component={BottomTabNavigator} />
            <Stack.Screen options={{headerShown: false}} name= 'Favoris' component={Favoris} />
            <Stack.Screen options={{headerShown: false}} name= 'Publier' component={Publier} />
            <Stack.Screen options={{headerShown: true}} name= 'PostDetail' component={PostDetail} />
            <Stack.Screen options={{headerShown: false}} name= 'Profil' component={Profil} />
            <Stack.Screen options={{headerShown: true}} name= 'PostModeration' component={PostModeration} />
            <Stack.Screen options={{headerShown: false}} name= 'CreationCompte' component={CreationCompte} />
            <Stack.Screen options={{headerShown: false}} name= 'Statistique' component={Statistique} />
            <Stack.Screen options={{headerShown: false}} name= 'TopTab' component={TopTab} />
            <Stack.Screen options={{headerShown: false}} name= 'Filtre' component={Filtre} />
          </Stack.Navigator>
        </NavigationContainer>
  )
}

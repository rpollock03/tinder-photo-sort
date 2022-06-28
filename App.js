import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from "./Main"
import Home from "./Home"
import New from './NEWTEST'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name='Main' component={Main} options={{headerShown: false}}  />
          <Stack.Screen name='New' component={New} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


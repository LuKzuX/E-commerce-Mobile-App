import { Stack } from 'expo-router'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from "./index"
import SignupScreen from './screens/SignupScreen'

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

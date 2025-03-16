import "../global.css"
import { Stack } from 'expo-router'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './index'
import SignupScreen from './screens/SignupScreen'
import CreateProductScreen from './screens/CreateProductScreen'
import { AuthProvider } from '../context/authContext'


export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
          <Stack.Screen name='CreateProduct' component={CreateProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

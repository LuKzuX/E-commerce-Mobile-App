import "../global.css"
import { Stack } from 'expo-router'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '.'
import SignupScreen from './screens/SignupScreen'
import SigninScreen from './screens/SigninScreen'
import CreateProductScreen from './screens/CreateProductScreen'
import { AuthContextProvider } from '../context/authContext.jsx'


export default function App() {

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="/">
          <Stack.Screen name='/' component={HomeScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
          <Stack.Screen name='Signin' component={SigninScreen} />
          <Stack.Screen name='CreateProduct' component={CreateProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  )
}

import '../global.css'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './(tabs)/index'
import SignupScreen from './(tabs)/SignupScreen'
import SigninScreen from './(tabs)/SigninScreen'
import UserScreen from './(tabs)/UserScreen'
import CreateProductScreen from './(tabs)/CreateProductScreen'
import ProductDetails from './(tabs)/ProductDetails'
import { AuthContextProvider } from '../context/authContext'
import { useAuthContext } from '../context/authContext'
import { View } from 'react-native'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const Stack = createStackNavigator()

export default function App() {
  return <AuthContextProvider>
    
  </AuthContextProvider>
}

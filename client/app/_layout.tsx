import "../global.css";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../app/(tabs)/index'
import SignupScreen from '../app/(tabs)/SignupScreen'
import SigninScreen from '../app/(tabs)/SigninScreen'
import CreateProductScreen from '../app/(tabs)/CreateProductScreen'
import { AuthContextProvider } from '../context/authContext'

const Stack = createStackNavigator();
export default function App() {

  return (
    <AuthContextProvider>
        <Stack.Navigator initialRouteName='/' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='/' component={HomeScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
          <Stack.Screen name='Signin' component={SigninScreen} />
          <Stack.Screen name='CreateProduct' component={CreateProductScreen} />
        </Stack.Navigator>
    </AuthContextProvider>
  )
}
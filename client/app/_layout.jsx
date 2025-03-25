import '../global.css'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './(tabs)/index'
import SignupScreen from './(tabs)/SignupScreen'
import SigninScreen from './(tabs)/SigninScreen'
import UserScreen from './(tabs)/UserScreen'
import CreateProductScreen from './(tabs)/CreateProductScreen'
import ProductDetails from "./(tabs)/ProductDetails"
import { AuthContextProvider } from '../context/authContext'
import { useAuthContext } from '../context/authContext'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export function Tabs() {
  const { user } = useAuthContext()
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = 'home-sharp'
          } else if (route.name === 'User') {
            iconName = 'person-circle-outline'
          } else if (route.name === 'Cart') {
            iconName = 'cart-outline'
          } else if (route.name === 'CreateProduct') {
            iconName = 'add-circle-outline'
          }
          return (
            <View style={{ alignItems: 'center' }}>
              {/* Line on top of the icon */}
              {focused && (
                <View
                  style={{
                    height: 2,
                    width: 36,
                    backgroundColor: color,
                    position: 'absolute',
                    top: -6,
                  }}
                />
              )}
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          )
        },
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size
          fontWeight: 'bold', // Adjust font weight
        },
        tabBarActiveTintColor: '#424949', // Active tab text/icon color
        tabBarInactiveTintColor: 'gray', // Inactive tab text/icon color
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name='User'
        component={UserScreen}
        options={{ title: 'You' }}
      />
      {user && user.user.isAdmin && (
        <Tab.Screen
          name='CreateProduct'
          component={CreateProductScreen}
          options={{ title: 'New Product' }}
        />
      )}
      {/* <Tab.Screen name='Cart' component={Cart} />  */}
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <AuthContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name='Tabs'
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signup'
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signin'
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CreateProduct'
          component={CreateProductScreen}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name='ProductDetails'
          component={ProductDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </AuthContextProvider>
  )
}

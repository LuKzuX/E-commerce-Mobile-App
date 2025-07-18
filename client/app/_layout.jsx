import '../global.css'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './(tabs)/index'
import SignupScreen from './(tabs)/SignupScreen'
import SigninScreen from './(tabs)/SigninScreen'
import UserScreen from './(tabs)/UserScreen'
import CreateProductScreen from './(tabs)/CreateProductScreen'
import ProductDetails from './(tabs)/ProductDetails'
import UpdateProductScreen from './(tabs)/UpdateProductScreen'
import ProductCategoriesScreen from './(tabs)/ProductCategories'
import Cart from './(tabs)/Cart'
import { AuthContextProvider, useAuthContext } from '../context/authContext'
import { ProductContextProvider } from '../context/productContext'
import { CartContextProvider } from '@/context/cartContext'
import { View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { QueryClient, QueryClientProvider } from 'react-query'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Optional: Configure global query options
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      cacheTime: 1000 * 60 * 10, // Keep data in memory for 10 minutes
    },
  },
})

function Tabs() {
  const { user } = useAuthContext()
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 55,
          zIndex: 0,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = 'home-sharp'
          } else if (route.name === 'User') {
            iconName = 'person-circle-outline'
          } else if (route.name === 'CreateProduct') {
            iconName = 'add-circle-outline'
          } else if (route.name === 'ProductCategories') {
            iconName = 'pricetag-outline'
          }
          return (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View
                  style={{
                    height: 2,
                    width: 46,
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
        name='ProductCategories'
        component={ProductCategoriesScreen}
        options={{ title: 'Explore' }}
      />
      <Tab.Screen
        name='User'
        component={UserScreen}
        options={{ title: 'User' }}
      />

      {user?.user?.isAdmin && <Tab.Screen
        name='CreateProduct'
        component={CreateProductScreen}
        options={{ title: 'Create Product' }}
      />}

      <Tab.Screen
        name='ProductDetails'
        component={ProductDetails}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <QueryClientProvider client={queryClient}>
            <Stack.Navigator>
              <Stack.Screen
                name='Tabs'
                component={Tabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='ProductDetails'
                component={ProductDetails}
                options={{
                  headerShown: true,
                  title: 'Product Details',
                  headerBackTitle: 'Back',
                }}
              />
              <Stack.Screen
                name='UpdateProduct'
                component={UpdateProductScreen}
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
                name='Cart'
                component={Cart}
                options={{
                  headerShown: true,
                  title: 'Your Cart',
                  headerStyle: {
                    backgroundColor: '#ebebeb', // light gray background
                    elevation: 0, // removes shadow on Android
                    shadowOpacity: 0, // removes shadow on iOS
                  },
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#333',
                  },
                  headerTintColor: '#rgb(37 99 235)', // back button and icons color
                  headerTitleAlign: 'center',
                }}
              />
            </Stack.Navigator>
          </QueryClientProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  )
}

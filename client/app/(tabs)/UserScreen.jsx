import { ScrollView, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { useAuthContext } from '../../context/authContext.jsx'

export default function UserScreen() {
  const { user } = useAuthContext()

  const navigation = useNavigation()
  return (
    <View>
      <View className=''>
        <Text className='text-text-medium'>{user.user.username}</Text>
      </View>
      <View className='h-screen flex flex-col items-center gap-10 my-20'>
        <Text
          onPress={() => navigation.navigate('Signin')}
          className='bg-green-400 py-6 px-12 rounded-xl text-text-medium'
        >
          Signin
        </Text>
        <Text
          onPress={() => navigation.navigate('Signup')}
          className='bg-blue-400 py-6 px-12 rounded-xl text-text-medium'
        >
          Signup
        </Text>
        <Text
          onPress={() => navigation.navigate('EditAccount')}
          className='bg-bg-yellow py-6 px-12 rounded-xl text-text-medium'
        >
          Edit Account
        </Text>
      </View>
    </View>
  )
}

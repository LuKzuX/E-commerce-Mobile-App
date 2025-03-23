import { ScrollView, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
export default function UserScreen() {
  const navigation = useNavigation()
  return (
    <View>
      <View className='flex flex-col items-center justify-center'>
        <Text onPress={() => navigation.navigate('Signin')} className='bg-green-400'>Signin</Text>
        <Text onPress={() => navigation.navigate('Signup')} className='bg-blue-400'>Signup</Text>
      </View>
    </View>
  )
}

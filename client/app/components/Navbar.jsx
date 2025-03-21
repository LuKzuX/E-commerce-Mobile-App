import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Navbar() {

  const navigation = useNavigation()

  return (
    <View>
      <Text onPress={() => navigation.navigate('Signup')}>Signup</Text>
      <Text onPress={() => navigation.navigate('Signin')}>Signin</Text>
    </View>
  )
}

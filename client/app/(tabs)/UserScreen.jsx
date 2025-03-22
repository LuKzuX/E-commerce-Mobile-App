import { ScrollView, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
export default function UserScreen() {
  const navigation = useNavigation()
  return (
    <View>
      <ScrollView>
        <Text onPress={() => navigation.navigate('Signin')}>Signin</Text>
      </ScrollView>
    </View>
  )
}

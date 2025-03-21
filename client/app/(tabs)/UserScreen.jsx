import { ScrollView, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
export default function UserScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  console.log(route.name);
  

  return (
    <View>
      <ScrollView>
        <Text>User Screen</Text>
      </ScrollView>
    </View>
  )
}

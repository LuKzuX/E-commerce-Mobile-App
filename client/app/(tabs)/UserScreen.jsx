import { ScrollView, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import Navbar from '../components/Navbar'
export default function UserScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  console.log(route.name);
  

  return (
    <View>
      <ScrollView>
        <Text>User Screen</Text>
      </ScrollView>
      <Navbar />
    </View>
  )
}

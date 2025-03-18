import { useSignin } from '../../utils/useSignin'
import { View, Text, TextInput, Button, } from 'react-native'
import { useState } from 'react'

export default function SigninScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signin(username, password)
  }

  return (
    <View >
      <Text >Sign In</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSubmit} />
    </View>
  )
}

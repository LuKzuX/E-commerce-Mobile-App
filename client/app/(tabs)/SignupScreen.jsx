import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useState } from 'react'

export default function SignupScreen() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    await signin(email, password)
  }

  return (
    <View className='flex-1 p-10 bg-bg-gray'>
      <View className='bg-white flex flex-col gap-10 p-6 shadow-md'>
        <TextInput
          className='border-b text-text-small-medium'
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
          secureTextEntry
        />
        <TextInput
          className='border-b text-text-small-medium'
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className='border-b text-text-small-medium'
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text
          className='text-center self-center bg-blue-400 py-6 px-12 text-text-medium rounded-xl'
          onPress={handleSubmit}
        >
          Signup
        </Text>
      </View>
    </View>
  )
}

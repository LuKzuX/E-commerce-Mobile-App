import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useState } from 'react'
import { useSignup } from '../../utils/useSignup'

export default function SignupScreen() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error } = useSignup()

  const handleSubmit = (username, email, password) => {
    signup(username, email, password)
  }

  return (
    <View className='flex-1 p-10 bg-bg-gray'>
      <View className='bg-white flex flesx-col gap-10 p-6 shadow-md'>
        <TextInput
          className='border-b text-text-small-medium'
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
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
          className='text-center self-center bg-blue-500 py-6 px-12 text-text-medium rounded-xl text-white'
          onPress={() => handleSubmit(username, email, password)}
        >
          Signup
        </Text>
        {error && (
          <View className='bg-red-100 border border-red-400 rounded px-4 py-3 mt-4 mx-6'>
            <Text className='text-red-700 text-sm font-medium'>{error}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

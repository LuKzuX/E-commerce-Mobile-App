import { useAuthContext } from '@/context/authContext.jsx'
import { View, Text, TextInput, ScrollView } from 'react-native'
import { useState } from 'react'

export default function SigninScreen() {
  const [email, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signin } = useAuthContext()

  const handleSubmit = async () => {
    await signin(email, password)
  }

  return (
    <ScrollView className='flex-1 p-10 bg-bg-gray'>
      <View className='bg-white flex flex-col gap-10 p-6 shadow-md'>
        <TextInput
          className='border-b text-text-small-medium'
          placeholder='Username'
          value={email}
          onChangeText={setUsername}
        />
        <TextInput
          className='border-b text-text-small-medium'
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text
          className='text-center self-center bg-green-400 py-6 px-12 text-text-medium rounded-xl'
          onPress={handleSubmit}
        >
          Signin
        </Text>
      </View>
    </ScrollView>
  )
}

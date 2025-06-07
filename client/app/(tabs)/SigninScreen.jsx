import { useAuthContext } from '../../context/authContext.jsx'
import { View, Text, TextInput, ScrollView } from 'react-native'
import { useState } from 'react'

export default function SigninScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signin, error } = useAuthContext()

  const handleSubmit = async () => {
    await signin(email, password)
  }

  return (
    <View className='flex-1 p-10 bg-bg-gray'>
      <View className='bg-white flex flex-col gap-10 p-6 shadow-md'>
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
          className='text-center self-center bg-green-500 py-6 px-12 text-text-medium rounded-xl text-white'
          onPress={handleSubmit}
        >
          Signin
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

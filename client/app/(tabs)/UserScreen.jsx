import { ScrollView, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { useAuthContext } from '../../context/authContext.jsx'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import useUpdaterUser from '../../utils/useUpdateUser.js'

export default function UserScreen() {
  const { user } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false)
  const navigation = useNavigation()
  const updateUserInfo = useUpdaterUser()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState('')
  const [areaCode, setAreaCode] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [state, setState] = useState('')

  const toggleUserEdit = () => {
    if (isEditing) {
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  //fecth uswer info and set the states to the user fields

  return (
    <View>
      <View className='mt-10 px-6'>
        <View className='bg-white p-5 rounded-2xl shadow-md border border-gray-200 gap-4'>
          <Text className='text-lg font-semibold text-gray-900 mb-4'>
            Account Information
          </Text>

          <View className='border-b border-gray-200 pb-3'>
            <Text className='text-gray-500 text-sm'>Username</Text>
            {!isEditing && (
              <Text className='text-gray-900 text-base text-text-small'>
                {username}
              </Text>
            )}
            {isEditing && (
              <TextInput
                value={username}
                onChangeText={(text) => setUsername(text)}
                autoFocus
                className='text-gray-900 text-base text-text-small'
              ></TextInput>
            )}
          </View>
          <View className='border-b border-gray-200 pb-3'>
            <Text className='text-gray-500 text-sm'>Email</Text>
            {!isEditing && (
              <Text className='text-gray-900 text-base text-text-small'>
                {email}
              </Text>
            )}
            {isEditing && (
              <TextInput
                value={email}
                onChangeText={(text) => setUsername(text)}
                className='text-gray-900 text-base text-text-small'
              ></TextInput>
            )}
          </View>
          <View className='border-b border-gray-200 pb-3'>
            <Text className='text-gray-500 text-sm'>Street</Text>
            {!isEditing && (
              <Text className='text-gray-900 text-base text-text-small'>
                {street}
              </Text>
            )}
            {isEditing && (
              <TextInput
                value={email}
                onChangeText={(text) => setUsername(text)}
                className='text-gray-900 text-base text-text-small'
              ></TextInput>
            )}
          </View>

          {!isEditing && (
            <Text
              onPress={toggleUserEdit}
              className='bg-bg-yellow mt-8 py-6 px-12 rounded-xl text-text-medium text-center'
            >
              Edit Account
            </Text>
          )}
          {isEditing && (
            <View className='flex-row gap-6 justify-center mt-8'>
              <Text
                onPress={toggleUserEdit}
                className='bg-red-500 w-44 text-center py-4 rounded-md text-text-small-medium'
              >
                Cancel
              </Text>
              <Text
                onPress={() => {
                  updateUserInfo(
                    username,
                    email,
                    password,
                    country,
                    areaCode,
                    city,
                    street,
                    state
                  )
                }}
                className='bg-green-400 w-44 text-center py-4 rounded-md text-text-small-medium'
              >
                Save Changes
              </Text>
            </View>
          )}
        </View>
      </View>

      <View className='h-screen flex flex-col items-center gap-10 my-20'>
        <Text
          onPress={() => navigation.navigate('Signin')}
          className='bg-green-400 py-6 px-12 rounded-xl text-text-medium'
        >
          Signin
        </Text>
        <Text
          onPress={() => navigation.navigate('Signup')}
          className='bg-blue-400 py-6 px-12 rounded-xl text-text-medium'
        >
          Signup
        </Text>
      </View>
    </View>
  )
}

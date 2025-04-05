import { ScrollView, View, Text } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useAuthContext } from '../../context/authContext.jsx'
import { useEffect, useState, useCallback } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import useUpdaterUser from '../../utils/useUpdateUser.js'
import axios from 'axios'
import { ip } from '../../getIp.js'

export default function UserScreen() {
  const { user, logout } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false)
  const navigation = useNavigation()
  const updateUserInfo = useUpdaterUser()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [country, setCountry] = useState('')
  const [areaCode, setAreaCode] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [state, setState] = useState('')

  const getUserData = async () => {
    try {
      const res = await axios.get(`http://${ip}:5000/material-delivery/user`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      if (user) {
        setUsername(res.data.username)
        setEmail(res.data.email)
        setCountry(res.data.address.country)
        setState(res.data.address.state)
        setCity(res.data.address.city)
        setStreet(res.data.address.street)
        setAreaCode(res.data.address.areaCode)
      }
    } catch (error) {
      console.log('no user logged')
    }
  }

  useFocusEffect(
    useCallback(() => {
      const a = async () => {
        setIsEditing(false)
        await getUserData()
      }
      a()
    }, [])
  )

  const toggleUserEdit = async () => {
    if (isEditing) {
      setIsEditing(false)
      await getUserData()
    } else {
      setIsEditing(true)
      getUserData()
    }
  }

  const togglePasswordEdit = () => {
    if (isEditingPassword) {
      setIsEditingPassword(false)
    } else {
      setIsEditingPassword(true)
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <ScrollView>
      {user && (
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
                  autoFocus
                  value={username}
                  onChangeText={(text) => setUsername(text)}
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
                  onChangeText={(text) => setEmail(text)}
                  className='text-gray-900 text-base text-text-small'
                ></TextInput>
              )}
            </View>

            {isEditing && (
              <View className=''>
                {!isEditingPassword && (
                  <Text
                    onPress={togglePasswordEdit}
                    className='self-start bg-bg-red px-3 py-4 rounded-lg'
                  >
                    Change Password
                  </Text>
                )}

                {isEditingPassword && (
                  <Text
                    onPress={() => {
                      togglePasswordEdit(), setPassword(''), setNewPassword('')
                    }}
                    className='self-start bg-bg-red px-3 py-4 rounded-lg mb-3'
                  >
                    Cancel
                  </Text>
                )}

                {isEditingPassword && (
                  <View>
                    <Text className='text-gray-500 text-sm'>
                      Current Password
                    </Text>
                    <TextInput
                      autoFocus
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                      className='text-gray-900 text-base text-text-small border-b border-gray-200'
                    ></TextInput>
                    <Text className='text-gray-500 text-sm'>New Password</Text>
                    <TextInput
                      value={newPassword}
                      onChangeText={(text) => setNewPassword(text)}
                      className='text-gray-900 text-base text-text-small border-b border-gray-200'
                    ></TextInput>
                  </View>
                )}
              </View>
            )}

            <View className='border-b border-gray-200 pb-3'>
              <Text className='text-gray-500 text-sm'>Street</Text>
              {!isEditing && (
                <Text className='text-gray-900 text-base text-text-small'>
                  {street}
                </Text>
              )}
              {isEditing && (
                <TextInput
                  value={street}
                  onChangeText={(text) => setStreet(text)}
                  className='text-gray-900 text-base text-text-small'
                ></TextInput>
              )}
            </View>
            <View className='border-b border-gray-200 pb-3'>
              <Text className='text-gray-500 text-sm'>City</Text>
              {!isEditing && (
                <Text className='text-gray-900 text-base text-text-small'>
                  {city}
                </Text>
              )}
              {isEditing && (
                <TextInput
                  value={city}
                  onChangeText={(text) => setCity(text)}
                  className='text-gray-900 text-base text-text-small'
                ></TextInput>
              )}
            </View>
            <View className='border-b border-gray-200 pb-3'>
              <Text className='text-gray-500 text-sm'>State</Text>
              {!isEditing && (
                <Text className='text-gray-900 text-base text-text-small'>
                  {state}
                </Text>
              )}
              {isEditing && (
                <TextInput
                  value={state}
                  onChangeText={(text) => setState(text)}
                  className='text-gray-900 text-base text-text-small'
                ></TextInput>
              )}
            </View>
            <View className='border-b border-gray-200 pb-3'>
              <Text className='text-gray-500 text-sm'>Area Code</Text>
              {!isEditing && (
                <Text className='text-gray-900 text-base text-text-small'>
                  {areaCode}
                </Text>
              )}
              {isEditing && (
                <TextInput
                  value={areaCode}
                  onChangeText={(text) => setAreaCode(text)}
                  className='text-gray-900 text-base text-text-small'
                ></TextInput>
              )}
            </View>

            {!isEditing && (
              <Text
                onPress={toggleUserEdit}
                className='self-center bg-bg-yellow mt-8 py-4 px-12 rounded-xl text-text-small-medium text-center'
              >
                Edit Account
              </Text>
            )}
            {isEditing && (
              <View className='flex-row gap-6 justify-center mt-8'>
                <Text
                  onPress={toggleUserEdit}
                  className='bg-bg-red w-44 text-center py-4 rounded-md text-text-small-medium'
                >
                  Cancel
                </Text>
                <Text
                  onPress={async () => {
                    await toggleUserEdit()
                    await updateUserInfo(
                      username,
                      password,
                      newPassword,
                      email,
                      country,
                      state,
                      city,
                      street,
                      areaCode
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
      )}

      {!user && (
        <View className='h-screen flex flex-col items-center gap-10 my-20'>
          <Text
            onPress={() => navigation.navigate('Signin')}
            className='bg-green-400 py-4 px-8 rounded-xl text-text-small-medium'
          >
            Signin
          </Text>
          <Text
            onPress={() => navigation.navigate('Signup')}
            className='bg-blue-400 py-4 px-8 rounded-xl text-text-small-medium'
          >
            Signup
          </Text>
        </View>
      )}
      <View>
        <Text
          onPress={handleLogout}
          className='self-center bg-bg-red py-4 px-8 rounded-xl text-text-small-medium mt-10'
        >
          Logout
        </Text>
      </View>
    </ScrollView>
  )
}

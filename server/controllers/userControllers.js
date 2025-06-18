import { User } from '../models/userSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { addressObject, checkAreaCodeFormat } from '../utils/userUtils.js'

export const getUser = async (req, res, next) => {
  try {
    const _id = req.user.user._id
    const user = await User.findOne({ _id })
    res.json(user)
  } catch (error) {
    return res.status(401).send(error)
  }
}

export const getUserToUpdate = async (req, res, next) => {
  try {
    const _id = req.user.user._id
    const user = await User.findOne({ _id })
    req.password = user.password
    next()
  } catch (error) {
    return res.status(401).send(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const ip =
      req.headers['x-forwarded-for']?.split(',').shift() ||
      req.socket?.remoteAddress ||
      req.ip
    const { username, password, email } = req.body
    const sameIpUser = await User.findOne({ ip: ip })
    if (sameIpUser) {
      return res.status(400).json({ statusText: 'You already have an account' })
    }

    if (!username || !password || !email) {
      return res.status(400).json({ statusText: 'Fill all the fields' })
    }
    if (password.length <= 3) {
      return res
        .status(400)
        .json({ statusText: 'Password must be longer than 3 characters' })
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const countryFormatObject = addressObject()
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      ip:
        req.headers['x-forwarded-for']?.split(',').shift() ||
        req.socket?.remoteAddress ||
        req.ip,
      address: countryFormatObject,
    })
    res.json(newUser)
  } catch (error) {
    console.log(error)

    res.status(500).json(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ statusText: 'Fill all the fields' })
    }
    const user = await User.findOne({ email })

    if (!bcrypt.compareSync(password, user.password) || !user) {
      return res.status(400).json({ statusText: 'Credentials are incorrect' })
    }

    const token = jwt.sign({ user }, process.env.SECRET)
    req.userId = user._id
    return res.json({ user, token })
  } catch (error) {
    console.log(error)

    return res.status(400).json({ statusText: 'Credentials are incorrect' })
  }
}

export const updateUserInfo = async (req, res, next) => {
  try {
    let hashedPassword = undefined
    const { _id } = req.user.user
    const {
      username,
      password,
      newPassword,
      email,
      country,
      areaCode,
      city,
      street,
      state,
    } = req.body

    const currentUser = await User.findById(_id)
    if (password || newPassword) {
      const salt = bcrypt.genSaltSync(10)
      const hashedNewPassword = bcrypt.hashSync(newPassword, salt)
      const hashedCurrentPassword = bcrypt.hashSync(password, salt)
      if (currentUser.password == hashedCurrentPassword) {
        return res
          .status(400)
          .json({ statusText: 'Current Password is incorrect' })
      }
      if (hashedNewPassword.length < 4) {
        return res
          .status(400)
          .json({ statusText: 'New password must be longer than 3 characters' })
      }
    }

    const user = await User.findByIdAndUpdate(
      { _id: _id },
      {
        $set: {
          username,
          password: hashedPassword,
          newPassword,
          email,
          address: {
            country,
            state,
            city,
            street,
            areaCode: checkAreaCodeFormat(country, areaCode),
          } || { null: null },
        },
      },
      { new: true, runValidators: true }
    )
    res.json(user)
  } catch (error) {
    return res.status(400).json({ statusText: error.message })
  }
}

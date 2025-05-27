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
    const { username, password, email } = req.body
    if (!username || !password || !email) {
      return res.status(400).send('Fill all the fields')
    }
    if (password.length <= 3) {
      return res.status(400).send('Password must be longer than 3 characters')
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const countryFormatObject = addressObject()
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      ip: req.ip,
      address: countryFormatObject,
    })
    res.json(newUser)
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!bcrypt.compareSync(password, user.password) || !user) {
      return res.status(400).send('Credentials are incorrect')
    }

    const token = jwt.sign({ user }, process.env.SECRET)
    req.userId = user._id
    return res.json({ user, token })
  } catch (error) {
    return res.status(400).send(error)
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

    const salt = bcrypt.genSaltSync(10)

    if (password == '' || newPassword == '') {
      hashedPassword = req.password
    } else if (!bcrypt.compareSync(password, req.password)) {
      return res.status(400).send('incorrect password')
    } else {
      hashedPassword = bcrypt.hashSync(newPassword, salt)
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
    return res.status(400).json(error)
  }
}

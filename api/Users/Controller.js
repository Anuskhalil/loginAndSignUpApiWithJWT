require('dotenv').config()
const { connect } = require('mongoose')
const user = require('./Modal')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')



const signin = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await connect(process.env.MONGO_URL)
        console.log("Success")

        const checkExist = await user.exists({ email: email })

        if (checkExist) {
            res.json({
                message: "User already Exist"
            })
        }
        else {
            await user.create({ username, email, password: await hash(password, 12) })

            res.json({
                message: "Successfully Singed In"
            })
        }



    } catch (error) {
        res.json({
            message: "Error"
        })
    }



}

const login = async (req, res) => {

    const { email, password } = req.body
    try {

        await connect(process.env.MONGO_URL)

        const checkExistUser = await user.findOne({ email: email })

        if (!checkExistUser) {
            res.json({
                message: "User not Found"
            })
        }
        else {

            const bcryptPass = compare(password, checkExistUser.password)
            console.log(bcryptPass)

            if (email == checkExistUser.email && bcryptPass) {

                const token = sign(
                    {
                        username: checkExistUser.username,
                        id: checkExistUser._id,
                        email: checkExistUser.email
                    },
                    process.env.JWT_SECRET
                )

                res.json({
                    message: "Successfully Loged In",
                    token: token
                })
            }

            else {
                res.json({
                    message: "Invalid Credentials"
                })
            }

            res.json({
                user: checkExistUser
            })
        }

    } catch (error) {

    }



}

module.exports = { signin, login }
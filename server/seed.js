require('dotenv').config()
const mongoose = require('mongoose')
const Admin = require('./models/adminSchema.js')

const main = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)

    const principal = await Admin.findOne({
      role: 'PRINCIPAL'
    })

    if (principal) {
      console.log('principal already exists')
    }

    const newAdmin = new Admin({
      name: 'Admin',
      email: 'principal@classroom.com',
      password: "Admin",
      role: 'PRINCIPAL'
    })

    await newAdmin.save()
    console.log("admin created!")

  } catch (err) {
    console.log('error creating admin account.', err)
  } finally {
    mongoose.connection.close()
  }
}

main()


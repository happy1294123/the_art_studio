import nodemailer from 'nodemailer'

const email = process.env.NEXT_EMAIL

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: process.env.NEXT_PASS
  }
})

export const mailOptions = {
  from: email,
  // to: email,
}
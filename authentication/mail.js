const nodemailer= require('nodemailer')
const {google} =require('googleapis')

const CLIENT_ID= '142511327430-21k0ua0j1lr3qbgu6mhgtjo564eg7h2e.apps.googleusercontent.com'
const CLIENT_SECRET= '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'
const REDIRECT_URI= 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN= '1//04L5jGN5-HbDWCgYIARAAGAQSNwF-L9Irx53v297-Mm8L0oOIdOpXhvh2shrzziAOk0DH0kUikqv1LPRxhjWCpdXh3bXRqFtfCVA'

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

async function SendMail(email) {
  try {
    
    const genrated_otp=Math.floor(Math.random() * 10000 +1);
    const accessToken=await oAuth2Client.getAccessToken()
 
    const transport=nodemailer.createTransport({
      service:'gmail',
      auth:{
        type:'Oauth2',
        user:'pavitragupta021@gmail.com',
        clientId : CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
        accessToken:accessToken
      }
    })
 
    const mailOption={
      from: 'Pamuru <pavitragupta021@gmail.com>',
      to:  email,
      subject: 'Your Pamuru account has password setting request',
      text: `Hello ${email} A request has been received to set the password in your pamuru account. \n Your OTP(one time password) to set password is : ${genrated_otp}\n For any query please contact to pavitragupta021@gmail.com `,
      html:`<p>Hello ${email} A request has been received to set the password in your pamuru account. \n Your OTP(one time password) to set password is :<strong> ${genrated_otp}</strong>\n For any query please contact to pavitragupta021@gmail.com </p>`
    }
    
    const result=await transport.sendMail(mailOption) 
     
    return genrated_otp
  } catch (error) {
    
    console.log(error);
  }
}
 
module.exports= SendMail
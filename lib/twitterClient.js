const { TwitterApi } = require('twitter-api-v2')
require('dotenv').config()

// console.log(process.env)

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
})

const roClient = client.readOnly
const rwClient = client.readWrite

module.exports = roClient
module.exports = rwClient

const rwClient = require('./twitterClient')

const tweet = async (status) => {
  try {
    await rwClient.v2.tweet(status)
    console.log('tweeted', status)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

module.exports = tweet

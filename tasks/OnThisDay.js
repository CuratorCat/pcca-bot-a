const fs = require('fs')

const tweet = require('../lib/tweet')

const today = new Date(),
  dd = String(today.getDate()).padStart(2, '0'),
  mm = String(today.getMonth() + 1).padStart(2, '0'),
  yyyy = String(today.getFullYear())

const path = './data/on-this-day/' + mm + dd + '.json'

if (fs.existsSync(path)) {
  // path exists
  console.log('data source:', path)
  // load data
  const data = require('../' + path)
  console.log('item count:', data.length)

  data.map((item, index) => {
    const { date, description: msg } = item
    const yearsBtw = parseInt(yyyy) - parseInt(date)
    const prefixMsg =
      yearsBtw === 1
        ? `A year ago today`
        : yearsBtw > 1
        ? `${yearsBtw} years ago today`
        : yearsBtw === 0
        ? `Today`
        : console.log('date error') & process.exit(1)
    const tweetMsg = `${prefixMsg}, ${lowercaseFirstLetter(msg)}`

    // delay 5s between every tweet
    delayedTweet(tweetMsg, index * 5000)
  })
} else {
  console.log('No events for today')
}

function delayedTweet(tweetMsg, time) {
  setTimeout(() => {
    if (process.env.IS_LOCAL_DEV) {
      console.log('dev tweet', tweetMsg, time)
    } else {
      tweet(tweetMsg)
    }
  }, time)
}

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

const fs = require('fs')

const tweet = require('../lib/tweet')
var today = new Date()
var dd = String(today.getDate()).padStart(2, '0')
var mm = String(today.getMonth() + 1).padStart(2, '0')
var yyyy = String(today.getFullYear())
// console.log('Today is', yyyy + '-' + mm + '-' + dd)

const path = './data/on-this-day/' + mm + dd + '.json'

if (fs.existsSync(path)) {
  // path exists
  console.log('Events file exist', path)
  // load data
  const data = require('../' + path)
  // console.log(data.length)

  data.map((data, index) => {
    var yearsMsg = ''

    var years = parseInt(yyyy) - parseInt(data.date)

    if (years === 1) {
      yearsMsg = 'A year ago today, '
    } else if (years > 1) {
      yearsMsg = years + ' years ago today, '
    } else if (years === 0) {
      yearsMsg = 'Today, '
    } else {
      console.log('date error')
      process.exit(1)
    }

    var tweetMsg = yearsMsg + lowercaseFirstLetter(data.description)

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

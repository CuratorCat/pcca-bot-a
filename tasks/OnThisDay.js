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

  data.map((data) => {
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

    if (process.env.IS_LOCAL_DEV) {
      console.log('dev tweet', tweetMsg)
    } else {
      tweet(tweetMsg)
    }
  })
} else {
  console.log('No events for today, exit')
}

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

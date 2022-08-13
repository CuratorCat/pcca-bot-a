const fs = require('fs')
let data = {
  name: 'On This Day',
  notice:
    'This file is auto generated, do not edit this file manually. This project is WIP, format may change in the future.',
  lastUpdated: '',
  data: [],
}
const dir = `./data/on-this-day/`
fs.readdir(dir, (err, files) => {
  return new Promise((resolve, reject) => {
    if (err) reject(err)
    files.forEach((file) => {
      console.log(file)
      let content = require(`../${dir}${file}`)
      data['data'] = data['data'].concat(content)
    })

    resolve(data)
  }).then((data) => {
    const date = new Date()
    data.lastUpdated = date.toISOString()
    fs.writeFileSync('./data/generated/on-this-day.json', JSON.stringify(data))
  })
})
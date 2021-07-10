const fs = require('fs');

const readDb = (path) => {
  
  return JSON.parse(fs.readFileSync(path)).data
}

const writeDb = (path, data) => {
  const dataString = JSON.stringify({
    data: data
  })
  fs.writeFileSync(path, dataString)
}

const exportObj = { readDb, writeDb }
module.exports = exportObj
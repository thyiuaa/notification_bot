const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const init = () => {
  fs.writeFileSync('./.env', 'DISCORD_TOKEN=your token here\nENVIRONMENT=pro\nDEVELOPER=')

  if (!fs.existsSync('./db')) {
    fs.mkdir('./db', err => {
      if (err) console.log(err);
    })
  }

  fs.writeFileSync('./db/Channels.json', JSON.stringify({
    data: ['your channel id here', 'more...']
  }))

  fs.writeFileSync('./db/CommandPrefix.json', JSON.stringify({
    data: 'your custom prefix here'
  }))

  fs.writeFileSync('./db/Commands.json', JSON.stringify({
    data: {
      help: "help",
      listNotifications: "list",
      setNotifications: "noti",
      setPrefix: "prefix"
    }
  }))

  fs.writeFileSync('./db/Notifications.json', JSON.stringify({
    "data": {
      "dummy": [{
        "weekDay": {
          "chiFull": "星期日"
        },
        "message": ""
      }, {
        "weekDay": {
          "chiFull": "星期一"
        },
        "message": ""
      }, {
        "weekDay": {
          "chiFull": "星期二"
        },
        "message": ""
      }, {
        "weekDay": {
          "chiFull": "星期三"
        },
        "message": ""
      }, {
        "weekDay": {
          "chiFull": "星期四"
        },
        "message": ""
      }, {
        "weekDay": {
          "chiFull": "星期五"
        },
        "message": ""
      }, {
        "weekDay": {
          "chiFull": "星期六"
        },
        "message": ""
      }]
    }
  }))
}

readline.question('Are you sure to initialize the application?\nThis will erase all perviously stored data.(y/n)', res => {
  if (res[0] === 'y') {
    init()
  }
  readline.close();
});


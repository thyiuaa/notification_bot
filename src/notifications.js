const fs = require('./file.js')

const pathNotifications = './db/Notifications.json'
let notifications = fs.readDb(pathNotifications)

const initNoti = () => {
  const prefixChiFull = '星期'
  const chiNum = ['日', '一', '二', '三', '四', '五', '六']
  const notiObj = new Array(7).fill().map((dummy, index) => {
    return {
      weekDay: {
        chiFull: '星期'+chiNum[index]
      },
      message: ''
    }
  })
  return notiObj
}

// to be expanded to check other format of weekday i.e. Wed, Monday, 一...
const checkWeekDay = (check, index) => {
  const chiFullMatch = (check === notifications['dummy'][index].weekDay.chiFull)
  return chiFullMatch
}

const writeNoti = (weekDay, messsage, channel) => {
  if (!notifications.hasOwnProperty(channel.id)) {
    console.log("new channel!", channel.id);
    notifications[channel.id] = initNoti()
  }
  console.log(notifications[channel.id]);
  notifications[channel.id][weekDay].message = messsage
  fs.writeDb(pathNotifications, notifications)
  channel.send(`Updated notifications!`)
  channel.send(`${notifications[channel.id][weekDay].weekDay.chiFull}\n${notifications[channel.id][weekDay].message}`)
}

const setNoti = (message) => {
  const splitedMessage = message.content.split('\n')
  if (splitedMessage.length < 2) {
    message.channel.send('Invalid anime list')
    return false
  }
  const weekDay = splitedMessage[0]
  let animeList = splitedMessage.slice(1).join('\n')
  if (checkWeekDay(weekDay, 1)) {
    writeNoti(1, animeList, message.channel)
  } else if (checkWeekDay(weekDay, 2)) {
    writeNoti(2, animeList, message.channel)
  } else if (checkWeekDay(weekDay, 3)) {
    writeNoti(3, animeList, message.channel)
  } else if (checkWeekDay(weekDay, 4)) {
    writeNoti(4, animeList, message.channel)
  } else if (checkWeekDay(weekDay, 5)) {
    writeNoti(5, animeList, message.channel)
  } else if (checkWeekDay(weekDay, 6)) {
    writeNoti(6, animeList, message.channel)
  } else if (checkWeekDay(weekDay, 0)) {
    writeNoti(0, animeList, message.channel)
  } else {
    message.channel.send('Invalid weekday')
    return false
  }
  return true
}

const listNoti = (channel) => {
  const channelNotis = notifications[channel.id]
  let message = ''
  for (let i = 0; i < 7; i++) {
    message += `${channelNotis[i].weekDay.chiFull}\n${channelNotis[i].message}`
  }
  channel.send(message)
}

const sendNoti = (client) => {
  const channelIDs = Object.keys(notifications).slice(1)
  channelIDs.forEach(id => {
    const channelNotis = notifications[id]
    const today = new Date().getDay()
    client.channels.fetch(id).then(channel => {
      if (channelNotis[today].message !== '') {
        channel.send(`${channelNotis[today].weekDay.chiFull}\n${channelNotis[today].message}`)
      }
    })
  })
}

const exportObj = { notifications, setNoti, listNoti, sendNoti }
module.exports = exportObj
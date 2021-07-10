/** custom import **/
require('dotenv').config()
const cron = require('cron');
const noti = require('./src/notifications.js')
const command = require('./src/command.js')
const commands = command.commands

// Import the discord.js module
const Discord = require('discord.js')

// Create an instance of a Discord client
const client = new Discord.Client()

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.once('ready', () => {
  console.log('Bot is ready')

  // send notification at 10:30 am every day
  let scheduledMessage = new cron.CronJob('00 30 10 * * *', () => {
    noti.sendNoti(client)
  })
  scheduledMessage.start()
})

const setNoti = (newMessage) => {
  console.log("Setting notification...");
  const result = noti.setNoti(newMessage)
  if (result) {
    console.log("Notification SUCCESSFULLY set!");
  } else {
    console.log("Notification setting FAILED!");
  }
}

const setPrefix = (newMessage) => {
  console.log("Setting prefix...");
  const result = command.setPrefix(newMessage)
  if (result) {
    console.log("Prefix SUCCESSFULLY set!");
  } else {
    console.log("Prefix setting FAILED!");
  }
}

// Create an event listener for messages
client.on('message', message => {
  if (command.stopProcessCommand(message) !== 'ok') {
    return
  }

  const [commandReceived, newMessage] = command.preprocessCommand(message)
  if (commandReceived === commands.setNotifications) {
    setNoti(newMessage)
  } else if (commandReceived === commands.setPrefix) {
    setPrefix(newMessage)
  } else if (commandReceived === commands.listNotifications) {
    noti.listNoti(message.channel)
  } else {
    console.log(`unknown command: ${commandReceived}`)
  }
})

client.setInterval(() => {
  noti.sendNoti(client)
}, 3000000)

// Log our bot in using the token from https://discord.com/developers/applications
client.login()
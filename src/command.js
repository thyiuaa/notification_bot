const fs = require('./file.js')

const pathCommandPrefix = './db/CommandPrefix.json'
const pathCommands = './db/Commands.json'
const pathChannels = './db/Channels.json'
let commandPrefix = fs.readDb(pathCommandPrefix)
const commands = fs.readDb(pathCommands)
let avaChannels = fs.readDb(pathChannels)

const setPrefix = (message) => {
  commandPrefix = message.content.split(' ')[0]
  fs.writeDb(pathCommandPrefix, commandPrefix)
  return fs.readDb(pathCommandPrefix) === commandPrefix
}

const isDevelopment = () => {
  return process.env.ENVIRONMENT === 'dev'
}

const isOwnCoammand = (message) => {
  return message.content.search(commandPrefix) === 0
}

const stopProcessCommand = (message) => {
  // only receive developer's message when in development environment
  if (isDevelopment() && process.env.DEVELOPER.search(message.author.username) === -1) return 'not a developer.'

  // only works in channels specified in ./db/Channels.json
  if (avaChannels.find(channel => channel === message.channel.id) === undefined) return 'not a specified channel'

  // avoid processing its own message
  if (message.author.id === '863248915598671873') return "bot's own command"

  // confirm the command prefix is valid
  if (!isOwnCoammand(message)) return 'not valid command prefix'

  return 'ok'
}

// separate command from the original message
const preprocessCommand = (message) => {
  const fullCommand = message.content.trim().split(commandPrefix)[1]
  const command = fullCommand.split(' ')[0].trim()
  const newMessage = {
    ...message,
    content: fullCommand.split(' ').slice(1).join(' ').trim()
  }
  console.log(newMessage.content);
  return [command, newMessage]
}

const exportObj = { commands, setPrefix, stopProcessCommand ,preprocessCommand}
module.exports = exportObj
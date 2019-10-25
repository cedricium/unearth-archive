/**
 * References:
 *  - https://medium.com/@gbuszmicz/cron-jobs-in-node-js-with-heroku-5f3c808b4d57
 *  - https://devcenter.heroku.com/articles/clock-processes-python
 */

const amqp = require('amqp-connection-manager')

const AMQP_URL = process.env.CLOUDAMQP_URL || 'amqp://localhost'
if (!AMQP_URL) process.exit(1)

const WORKER_QUEUE = 'worker-queue'

const connection = amqp.connect([AMQP_URL])
const connection = amqp.connect([AMQP_URL])
console.log('[AMQP] - Connecting...')

connection.on('connect', () => {
  process.once('SIGINT', () => connection.close())
  console.log('[AMQP] - Connected!')
  return startScheduledJobs(JOBS)
})

connection.on('disconnect', params => {
  return console.error('[AMQP] - Disconnected.', params.err.stack)
})

let channelWrapper = connection.createChannel({
  json: true,
  setup: channel => {
    return Promise.all([
      channel.assertQueue(WORKER_QUEUE, { autoDelete: false, durable: true }),
      channel.prefetch(1),
      channel.consume(WORKER_QUEUE, onMessage),
    ])
  },
})

channelWrapper
  .waitForConnect()
  .then(() => {
    console.log(`[AMQP] - Listening for messages on queue => ${WORKER_QUEUE}`)
  })
  .catch(err => {
    console.error('[AMQP] - Error! ', err)
  })

const onMessage = data => {
  let message
  try {
    message = JSON.parse(data.content.toString())
  } catch (err) {
    console.error('[AMQP] - Error parsing message... ', data)
  }

  console.log('[AMQP] - Message incoming... ', message)
  channelWrapper.ack(data)
  if (!message) {
    return
  }

  switch (message.taskName) {
    case 'daily':
      break

    case 'weekly':
      break

    case 'monthly':
      break

    default:
      console.error(`No task was found with name => ${message.taskName}`)
      break
  }
}

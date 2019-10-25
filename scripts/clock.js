/**
 * References:
 *  - https://medium.com/@gbuszmicz/cron-jobs-in-node-js-with-heroku-5f3c808b4d57
 *  - https://devcenter.heroku.com/articles/clock-processes-python
 */

const CronJob = require('node-cron').CronJob
const amqp = require('amqp-connection-manager')

const AMQP_URL = process.env.CLOUDAMQP_URL || 'amqp://localhost'
if (!AMQP_URL) process.exit(1)

const WORKER_QUEUE = 'worker-queue'
const CLOCK_QUEUE = 'clock-queue'
const JOBS = [
  {
    name: 'daily',
    message: { taskName: 'dailyEmail', queue: WORKER_QUEUE },
    // cronTime: '0 1 * * *',
    cronTime: '* * * * *',
  },
  {
    name: 'weekly',
    message: { taskName: 'weeklyEmail', queue: WORKER_QUEUE },
    cronTime: '15 1 * * 0',
  },
  {
    name: 'monthly',
    message: { taskName: 'monthlyEmail', queue: WORKER_QUEUE },
    cronTime: '30 1 1 * *',
  },
]

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

function startScheduledJobs(jobs) {
  if (jobs && jobs.length) {
    jobs.forEach(job => {
      const j = new CronJob({
        cronTime: job.cronTime ? job.cronTime : new Date(job.dateTime),
        onTick: () => {
          sendMessage(job.message)
          if (!job.repeat) j.stop()
        },
        onComplete: () => {
          console.log('Job completed! Removing now...')
        },
        timeZone: 'America/Los_Angeles',
        start: true,
      })
    })
  }
}

function sendMessage(data) {
  let message
  try {
    message = JSON.parse(data)
  } catch (err) {
    console.error(err)
  }

  if (!message) {
    return
  }

  let queue = message.queue || WORKER_QUEUE
  let senderChannelWrapper = connection.createChannel({
    json: true,
    setup: channel => {
      return channel.assertQueue(queue, { durable: true })
    },
  })

  senderChannelWrapper
    .sendToQueue(queue, message, {
      contentType: 'application/json',
      persistent: true,
    })
    .then(() => {
      console.log('[AMQP] - Message send to queue => ', queue)
      senderChannelWrapper.close()
    })
    .catch(err => {
      console.error(
        `[AMQP] - Message to queue => ${queue} <= was rejected!`,
        err.stack,
      )
      senderChannelWrapper.close()
    })
}

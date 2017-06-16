#!/usr/bin/env node

const program = require('commander')
const clc = require('cli-color')
const SgServer = require('sg-server')

let {
  cyan,
  cyanBright
} = clc

program
  .option('-p --port [port]', 'Port', 8080)
  .parse(process.argv)

let {
  port
} = program

const showResponse = (ctx) => {
  let {
    method,
    url,
    body
  } = ctx.request
  console.log(cyan(method), cyanBright(url), body)
  ctx.body = ''
  ctx.status = 200
}

const server = SgServer({
  endpoints: {
    '/*': {
      GET: showResponse,
      POST: showResponse,
      PUT: showResponse
    }
  }
})

server.listen(port).then(() => console.log(`Listening on port ${port}`))

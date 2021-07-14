const express = require('express')
const path = require('path')
const fs = require('fs')
const { renderToString } = require('@vue/server-renderer')
const favicon = require('serve-favicon')
const serialize = require('serialize-javascript')
// const manifest = require('./dist/manifest.json')

const server = express()

// const appPath = path.join(process.cwd(), 'dist', manifest['main.js'])

server.use(favicon('./public/favicon.ico'))
server.use('/public', express.static(path.join(process.cwd(), 'public')))
server.use('/client', express.static(path.join(process.cwd(), 'dist', 'client')))
server.use('/server', express.static(path.join(process.cwd(), 'dist', 'server')))
server.get('*', async (req, res) => {
  // const createApp = require(appPath).default
  const createApp = require('./dist/server/server.bundle').default
  const { app, store } = await createApp(req.path)

  const renderedApp = await renderToString(app)

  const renderState = `
    <script>
      window.INITIAL_DATA = ${serialize(store?.state)}
    </script>`

  fs.readFile(path.join(__dirname, '/dist/index.html'), (err, html) => {
    if (err) {
      throw err
    }

    const outputHtml = html
      .toString()
      .replace('<!--vue-initial-data-->', renderState)
      .replace('<!--vue-ssr-outlet-->', renderedApp)
    res.setHeader('Content-Type', 'text/html')
    res.send(outputHtml)
  })
})

server.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${process.env.PORT || 8080}`)
})

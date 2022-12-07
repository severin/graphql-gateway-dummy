process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const { buildMesh } = require('./src/build-mesh')
const { startServer } = require('./src/build-server')
const { buildStore } = require('./src/build-store')

const CONFIG_DIR = 'config'

async function main() {
  const { schema } = await buildMesh({
    configName: process.env.NODE_ENV,
    dir: CONFIG_DIR,
    store: buildStore(CONFIG_DIR),
  })

  await startServer(schema)
}

main().catch((err) => console.error(err))

const { findAndParseConfig } = require('@graphql-mesh/cli')
const { getMesh } = require('@graphql-mesh/runtime')

async function buildMesh(configOptions) {
  const meshConfig = await findAndParseConfig(configOptions)
  const mesh = await getMesh(meshConfig)
  return mesh
}

module.exports = {
  buildMesh,
}

const fs = require('fs')
const path = require('path')
const { MeshStore, InMemoryStoreStorageAdapter } = require('@graphql-mesh/store')

const MESH_STORE_DIR = '.mesh'

/**
 * @param {string} dir
 */
function buildStore(dir) {
  const configDirPath = path.join(process.cwd(), dir)
  const meshStoreDirPath = path.join(configDirPath, MESH_STORE_DIR)

  // Delete mesh store directory to create a fresh one
  fs.rmSync(meshStoreDirPath, { recursive: true, force: true })

  const storeStorageAdapter = new InMemoryStoreStorageAdapter()

  return new MeshStore(meshStoreDirPath, storeStorageAdapter, {
    /**
     * Setting readonly to false is the only difference from the default MeshStore which has
     * readonly set to true on production. When readonly is set to true, the schema is not cached
     * in the store, but graphql-mesh only picks the stored value and discard the schema freshly
     * fetched (which sounds like a bug to me).
     *
     * @see https://github.com/Urigo/graphql-mesh/blob/%40graphql-mesh/config%400.19.5/packages/store/src/index.ts#L175-L188
     */
    readonly: false,
    validate: false,
  })
}

module.exports = {
  buildStore,
}

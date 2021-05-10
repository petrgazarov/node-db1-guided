const db = require('../../data/db-config')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

function get(query) {
  return db.raw(`select * from posts limit ?`, [query.limit])
}

function getById() {
  return Promise.resolve('getById wired')
}

function create() {
  return Promise.resolve('create wired')
}

function update() {
  return Promise.resolve('update wired')
}

function remove() {
  return Promise.resolve('delete wired')
}

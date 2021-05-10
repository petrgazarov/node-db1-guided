const db = require('../../data/db-config')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

function get() {
  // return db.raw(`select * from posts limit ?`, [query.limit])
  // return db.select().table('posts')
  // return db('posts')
  return db.select('*').from('posts')
}

function getById(id) {
  // return db.raw(`select * from posts where id = ?`, [id])
  // return db('posts').where('id', id)
  return db('posts').where({ id })
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

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
  // RETURNS ARRAY UNLESS WE CHAIN .first()
  // return db.raw(`select * from posts where id = ?`, [id])
  // return db('posts').where('id', id)
  return db('posts').where({ id }).first()
}

async function create(post) {
  // HERE
  const [id] = await db('posts').insert(post)
  return db('posts').where({ id }).first()
}

function update() {
  return Promise.resolve('update wired')
}

function remove() {
  return Promise.resolve('delete wired')
}

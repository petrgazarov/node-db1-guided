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
  // HERE THE DATA SHOULD BE PERFECT
  const [id] = await db('posts').insert(post)
  // RETURN GOOD STUFF FOR THE CLIENT
  return getById(id)
}

function update() {
  return Promise.resolve('update wired')
}

function remove() {
  return Promise.resolve('delete wired')
}

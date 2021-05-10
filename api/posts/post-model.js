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

async function getById(id) {
  // RETURNS ARRAY UNLESS WE CHAIN .first()
  // return db.raw(`select * from posts where id = ?`, [id])
  // return db('posts').where('id', id)
  const stuff = await db('posts').where({ id }).first()
  return stuff
}

async function create(post) {
  // HERE THE DATA SHOULD BE PERFECT
  // WITH SQLITE, AN ARRAY OF IDS GETS RESOLVED
  const [id] = await db('posts').insert(post)
  // RETURN GOOD STUFF FOR THE CLIENT
  // USE ASYNC KEYWORD IF YOU NEED AWAIT INSIDE FUNCTION
  return getById(id)
}

function update(post) {
  return db()
}

function remove() {
  return Promise.resolve('delete wired')
}

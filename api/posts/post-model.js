const db = require('../../data/db-config');

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  return db('posts');
}

async function getById(id) {
  return db('posts').where({ id }).first();
}

async function create(data) {
  const [id] = await db('posts').insert(data);

  return getById(id);
}

async function update() {
  return 'update wired'
}

async function remove() {
  return 'delete wired'
}

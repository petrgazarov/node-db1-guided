const db = require('../../data/db-config');

//----------------------------------------------------------------------------//
//  get posts from the 'posts' table
//----------------------------------------------------------------------------//
// The syntax for knex is similar to a SQL statement:
//  * specify the action (select, delete, update, etc.)
//  * specify the location (i.e. table name)
//  * implement filters and other clauses (like where and order by)
//
// The knex API is a promise-based API. So the methods return a promise (or
// a promise-like object, with .then() and .catch()).
//
// This means that we can use .then().catch() syntax, or async/await syntax with
// what knex returns.
//
// In addition, knex provides different syntaxes for using its api.
//
// - First syntax: You can call the knex object (named "db" here), and
//   specify as a parameter the "location" (table name) that you want to
//   perform an action.
//
// - Second syntax: You can call the action method on the knex object, and
//   specify the location (table name) using methods that are similar to SQL
//   statements.
//
// For example:
//
//    db('table1').select('column1', 'column2').where({conditions})
//
//      or
//
//    db.select('column1', 'column2').from('table1').where({conditions})
//
// These are the same. The second one reads more like a SQL statement.
//
// In this example, we are using the first syntax.
async function get() {
  // 👉 SELECT * FROM posts;

  return db('posts');
}

//----------------------------------------------------------------------------//
//  get a single post by id
//----------------------------------------------------------------------------//
async function getById(id) {
  // 👉 SELECT * FROM posts WHERE id = 1;

  return db('posts').where({ id }).first();
  // 💡 we need first() otherwise we get an array
  // which by the way is always truthy even if it's empty
}

//----------------------------------------------------------------------------//
//  create a new post
//----------------------------------------------------------------------------//
async function create(data) {
  // 👉 INSERT INTO posts (title, contents) VALUES ('foo', 'bar');

  const [id] = await db('posts').insert(data);

  return getById(id);
}

//
//----------------------------------------------------------------------------//
//  update a post with the specified id
//----------------------------------------------------------------------------//
// 💡 With [PUT] it is convention to "replace" the entire resource
// even if not all fields have changes
//
async function update(id, { title, contents }) {
  // 👉 UPDATE posts SET title = 'foo', contents = 'bar' WHERE id = 1;

  await db('posts').where({ id }).update({ title, contents });

  return getById(id);
}

async function remove(id) {
  // 👉 DELETE FROM posts WHERE id = 1;

  const toBeDeleted = await getById(id);

  await db('posts').where('id', id).delete();

  return toBeDeleted;
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

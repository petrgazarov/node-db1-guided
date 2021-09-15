//----------------------------------------------------------------------------//
//  Knex Magic
//----------------------------------------------------------------------------//
//  This is the place where knex is hooked up to our application.
//
//  Knex is a "query builder" - a library that assists in forming a valid SQL
//  query in the dialect of whatever database you are using. In this project, we
//  are using SQLite3, which is supporeted by knex. If there are idiosynchrosies
//  or oddities about SQLite3's variant of SQL, they are abstracted from us...
//  we don't have to know about them or care. We aren't writing to SQLite3. We
//  are writing to knex. Knex writes to SQLite3 for us.
//
//  Through the configuration of knex, we specify what database we are actually
//  using, and we provide knex with whatever information it needs in order to
//  access that database.
//
//  The knexfile.js file specifies that we are using SQLite3, and specifies
//  where our database file is. This is how knex knows where to send the SQL
//  queries once it builds them.
//
//  We instruct knex in how to build whatever SQL command we want by using the
//  knex methods. These are documented at https://knexjs.org. The methods
//  closely resemble the actual standard SQL statements (with a few exceptions
//  where the SQL statement is actually a JavaScript "reserved word", and it's
//  not possible to name a method or property with that word - like "delete".)
//
//  Once we get a handle to the knex system (the first "require()"
//  statement...), we then pass in a configuration JSON object to it. We get the
//  configuration JSON object from the ../knexfile.js, where it is exported. It
//  is typical for knexfile.js to export an object with a different property for
//  our "development" environment, and a different one for "production", etc.
//
const knex = require('knex');

const config = require('../knexfile.js');

module.exports = knex(config.development);

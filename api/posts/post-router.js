const express = require('express');
const Post = require('./post-model');

const router = express.Router();

//----------------------------------------------------------------------------//
// Note that Post.getById() returns an actual object, not an array of
// objects (be it an empty array, or an array with a single element). So if the
// id isn't found in the DB, we will get back null (not truthy).
//----------------------------------------------------------------------------//
async function checkId(req, res, next) {
  try {
    const post = await Post.getById(req.params.id);

    if (post) {
      // Save post to the res saving an extra trip to the database
      res.locals.post = post;
      next();
    } else {
      res.status(404).json({ message: "Post cannot be found" });
    }
  } catch(e) { next(e) }
}

//----------------------------------------------------------------------------//
// Validate that title and contents are present on the request.body
//----------------------------------------------------------------------------//
function checkPayload(req, res, next) {
  const { title, contents } = req.body;

  if (title && contents) {
    next();
  } else {
    res.status(400).json({ message: 'Title and contents are required' });
  }
}

router.get('/', async (req, res, next) => {
  try {
    const data = await Post.get();

    res.json(data);
  } catch (err) { next(err) }
})

//----------------------------------------------------------------------------//
// Return a single record. Note that if we get to this route handler, it's
// because we got past the checkId validator, which puts the found record on the
// response object, so we just return that.
//----------------------------------------------------------------------------//
router.get('/:id', checkId, async (req, res) => {
  res.json(res.locals.post);
})

router.post('/', checkPayload, async (req, res, next) => {
  try {
    // req.body.title and req.body.contents are verified to be present
    const data = await Post.create({
      title: req.body.title,
      contents: req.body.contents,
    });

    res.json(data);
  } catch (err) { next(err) }
})

router.put('/:id', checkPayload, checkId, async (req, res, next) => {
  try {
    // id checked and req.body.title and req.body.contents are verified to be present
    const data = await Post.update(req.params.id, {
      title: req.body.title,
      contents: req.body.contents,
    });

    res.json(data);
  } catch (err) { next(err) }
})

router.delete('/:id', checkId, async (req, res, next) => {
  try {
    // id checked
    const data = await Post.remove(req.params.id);
    res.json(data);
  } catch (err) { next(err) }
})

// This error handling middleware needs to come after the endpoints
// and it needs the `next` parameter even if it's not used.
router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router

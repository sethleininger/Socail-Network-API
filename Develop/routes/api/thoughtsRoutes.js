const router = require('express').Router();
const{
getThoughts,
getSingleThought,
createThoughts,
deleteThought,
updateThought,
createReaction,
deleteReaction

} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

//  /api/thoughts/:thoughtId 
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

//  /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;
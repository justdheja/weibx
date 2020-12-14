const express = require('express')
const courseController = require('../controllers/courseController')

const router = express.Router();

const authCheck = (req, res, next) => {
  if(!req.user) {
    res.redirect('/auth/login')
  } else {
    next()
  }
}

router.get('/', courseController.course_index)

router.get('/all-course', courseController.course_index)

router.post('/', authCheck, courseController.course_create_post);

router.get('/dashboard', authCheck, courseController.course_create_get)

router.get('/:id', courseController.course_details)

router.delete('/:id', authCheck, courseController.course_delete);


module.exports = router;
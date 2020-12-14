const Course = require('../models/course')

const course_index = (req, res) => {
  Course.find().sort({
      createdAt: -1
    })
    .then((result) => {
      res.render('courses/index', {
        title: 'All Courses',
        courses: result,
        user: req.user ? req.user : null
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const course_details = (req, res) => {
  const id = req.params.id
  Course.findById(id)
    .then((result) => {
      res.render('courses/details', {
        course: result,
        title: result.title,
        user: req.user ? req.user : null
      })
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Course not Found' })
    })
}

const course_create_get = (req, res) => {
  Course.find({
    googleId: req.user.googleId
  }).sort({
		createdAt: -1,
	}).then((result) => {
    res.render('courses/create', {
      title: 'Dashboard',
      user: req.user ? req.user : null,
      courses: result
    });
  })
  .catch((error) => {
    console.log(error)
  })
}

const course_create_post = (req, res) => {
  const course = new Course(
    {
      title: req.body.title,
      youtubeId: req.body.youtubeId,
      description: req.body.description,
      author: req.user.username,
      googleId: req.user.googleId,
      picture: req.user.picture
    }
  )

  course.save()
    .then((result) => {
      res.redirect('/course/dashboard')
    })
    .catch((err) => {
      console.log(err)
    })
}

const course_delete = (req, res) => {
  const id = req.params.id

  Course.findByIdAndDelete(id)
    .then(result => {
      res.json({
        redirect: '/course'
      })
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  course_index,
  course_details,
  course_create_get,
  course_create_post,
  course_delete
}

const express = require('express')

const router = express.Router()
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('auth/index', {
		title: 'Log In',
		user: req.user ? req.user : null,
	});
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/course/dashboard')
})

module.exports = router
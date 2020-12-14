const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes')
const authRoutes = require('./routes/authRoutes')
const PORT = process.env.PORT || 3000
const passportSetup = require('./services/passport-setup')
const passport = require('passport')
const keys = require('./services/keys')
const cookieSession = require('cookie-session')

const app = express();

// connect DB
const dbURI = keys.mongoDB.dbURI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log('connected to db')
		app.listen(process.env.PORT || 3000, () => {
			console.log('app listen on http://localhost:3000');
		});
	})
	.catch((err) => console.log(err))

app.set('view engine', 'ejs');

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (req, res) => {
	res.render('index', { title: 'Home', user: req.user ? req.user : null });
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About', user: req.user ? req.user : null });
});

app.use('/auth', authRoutes)

app.use('/course', courseRoutes)

app.use((req, res) => {
	res
		.status(404)
		.render('404', { title: 'Not Found', user: req.user ? req.user : null });
})

// module.exports = app
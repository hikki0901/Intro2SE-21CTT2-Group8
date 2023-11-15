const express = require('express'); 
const morgan = require('morgan');

//express app
const app = express();

//register view engines
app.set('view engine', 'ejs');
app.set('views', 'ejs-views');

//middleware & static files
app.use(express.static('css'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.listen(3000);

app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact'});
});

app.get('/login', (req, res) => {
    res.render('login', {title: 'Login'});
});

app.use((req, res) => {
    res.status(404).render('404', {title: 'Error'});
});
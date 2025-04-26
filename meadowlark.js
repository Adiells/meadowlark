const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')
const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()
const port = process.env.PORT || 3000

const hbs = expressHandlebars.create({
    defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)

app.get('/about', handlers.about)

// página 404 personalizada
app.use(handlers.notFound)

// página 500 personalizada
app.use(handlers.serverError)

app.listen(port, () => console.log(
    `Express started on http:localhost:${port}` + 'press Ctrl-C to terminate.'
))
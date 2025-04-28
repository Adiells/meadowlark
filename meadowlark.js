const handlers = require('./lib/handlers')
const fortune = require('./lib/fortune')
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

app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

app.get('/about', (req, res) => {
    res.render('about', {fortune: fortune.getFortune()})
})

// página 404 personalizada
app.use(handlers.notFound)

// página 500 personalizada
app.use(handlers.serverError)

if(require.main === module){
    app.listen(port, () => {
        console.log(`Express started on http://localhost:${port}` + '; press Ctrl-C to terminate')
    })
}else{
    module.export = app
}
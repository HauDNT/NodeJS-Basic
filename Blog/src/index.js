const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const port = 3001;

const route = require('./routes'); // ~ require('./routes/index.js')

// Routes init
route(app);

// Trả về path/Service file static (file tĩnh):
app.use(express.static(path.join(__dirname, 'public/')));

// Use middleware:
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger (morgan)
// app.use(morgan('combined'));

// Template engine:
app.engine(
            'hbs',
    handlebars.
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

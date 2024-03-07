const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const port = 3001;
const route = require('./routes'); // ~ require('./routes/index.js')
const db = require('./config/db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middleware/sortMiddleware');

// Connect to database:
db.connect();

// Use middleware (Luôn đặt lên trên cùng, chỉ đứng sau connect DB):
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

// Custom middlewares:
app.use(SortMiddleware);

app.use((req, res, next) => {
    // Kiểm tra ngoại lệ nếu đường dẫn bị đổi thành '/me/stored/courses'
    if (req.path === '/me/courses/create') {
        // Chuyển hướng đến '/courses/create'
        return res.redirect('/courses/create');
    }
    // Nếu không phải đường dẫn trên, tiếp tục xử lý các middleware và route khác
    next();
});

// Use method override (Luôn đặt trước route init):
app.use(methodOverride('_method'));

// Template engine:
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type :'default';

                const icons = {
                    default: '#',
                    asc: 'Up',
                    desc: 'Down',
                };
                
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">${icon}</a>`;
            }
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

// Trả về path/Service file static (file tĩnh):
app.use(express.static(path.join(__dirname, 'public/')));

// HTTP logger (morgan)
app.use(morgan('combined'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// LIBRAIRIES
const express = require('express');
const app = express();
const config = require('./config/config.json');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

// ROUTERS
const studentsRouter = require('./routers/studentsRouter');
const classesRouter = require('./routers/classesRouter');
const graduatesRouter = require('./routers/graduatesRouter');
const coursesRouter = require('./routers/coursesRouter');

app.use(cors());
app.use(express.json());
app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Uniquement "/" car tout est géré dans les routers
app.use('/', studentsRouter);
app.use('/', classesRouter);
app.use('/', graduatesRouter);
app.use('/', coursesRouter);

app.listen(config.PORT, () => {
    console.log('Server listening on port ' + config.PORT);
});

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

const indexRouter = require('./routes/index');


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const appError = require('./utils/appError');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(express.json());
app.use("/", require('./routes'));

app.all('*', (req, res, next) => {
  next(new appError(`The url ${req.originalUrl} does not exist.`, 404));
});

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
})

module.exports = app;
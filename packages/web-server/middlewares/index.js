const jsonHandler = require('./jsonHandler');
const errorHandler = require('./errorHandler');

module.exports = (app) => {
    app.use(jsonHandler());
    app.use(errorHandler());
}
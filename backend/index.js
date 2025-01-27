require('dotenv').config();
const app = require('./app')
const PORT = process.env.PORT || 8080;
const logger = require('./utils/logger')

app.listen(PORT, ()=> {
    logger.info(`server is listening on port ${PORT}`);
})
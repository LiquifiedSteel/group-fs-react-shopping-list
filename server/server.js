const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const itemRouter = require('./routers/item.router');
const PORT = process.env.PORT || 5002;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/items', itemRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});

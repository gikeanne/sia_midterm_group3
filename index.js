const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/categories', require('./routes/categories.routes'));

app.listen(1234, () => {
console.log('Server is running on http://localhost:1234');
});
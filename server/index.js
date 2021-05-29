require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8000;
const app = require('./server');
app.listen(PORT, () => console.log('Server listening on port http://localhost:' + PORT));

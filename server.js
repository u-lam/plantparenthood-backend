const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require("dotenv").config();

// port, routes, db
const PORT = process.env.PORT || 4100;
const routes = require('./routes');
const db = require('./models');

// Cors
const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Routes
app.use('/api/v1', routes.api);

app.get('/', (req, res) => {
  res.send('This is the api page');
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));

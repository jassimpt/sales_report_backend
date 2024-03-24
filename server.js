const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(() => console.error('Failed to connect!'));

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

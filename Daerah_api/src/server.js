require('dotenv').config();
const express = require('express');
const app = express();
const wilayahRoutes = require('./routes/wilayahRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
const { sequelize } = require('./models');



app.use(express.json());

// Public routes
app.use('/auth', authRoutes);

// Protected routes (require token)
app.use('/api/wilayah', authMiddleware.verifyToken, wilayahRoutes);

// Wrong endpoint handler
app.use((req, res) => {
  res.status(404).json({
    status: false,
    data: [],
    message: "404 Not Found"
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

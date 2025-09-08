const express = require('express');
const app = express();
const sequelize = require('./config/database');
const wilayahRoutes = require('./routes/wilayahRoutes');

app.use(express.json());
app.use('/api/wilayah', wilayahRoutes);
app.use((req, res) => {
  res.status(404).json({
    status: false,
    data: [],
    message: "404 Not Found"
  });
});

// Connect to DB then start server
const PORT = 3000;
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected...');
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));

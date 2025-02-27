const express = require('express');
const { sequelize } = require('./models');

const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

app.use('/api', customerRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

sequelize.sync()
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ Database error:', err));

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));

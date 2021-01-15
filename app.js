const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const categoryRouter = require('./routes/category.router');
const productRouter = require('./routes/product.router');
const braintreeRouter = require('./routes/braintree.router');
const orderRouter = require('./routes/order.router');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors());
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', braintreeRouter)
app.use('/api', orderRouter)

mongoose.connect(
    process.env.DATABASE,
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
)
.then(() => console.log('DB Connected'));
   
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server Started at port ${port}`);
})
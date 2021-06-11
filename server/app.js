const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')
const dotenv = require("dotenv")

const app = express();
const connectDb = require('./config/db')
dotenv.config({ path: "./config/.env" });
connectDb()



const auth = require('./routes/auth')
const category = require('./routes/category')
const user = require('./routes/user')
// const blog = require('./routes/blog')


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}


app.use('/api/v1', auth)
app.use('/api/v1', user)
app.use('/api/v1', category)
// app.use('/api', blog)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
require('dotenv').config();
const express = require('express');

require('./connection/db')
const router=require('./Routes/router')
const cors=require('cors')

const app = express();
app.use(express.json());
app.use(cors());
app.use(router)
app.use('/uploads',express.static('./uploads'))

const port = 3000||process.env.PORT;


app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
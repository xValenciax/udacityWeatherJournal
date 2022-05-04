const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

const port = 8000;



app.use(express.static('website'));
var projectData = {};

app.get('/all', getAllData);

const getAllData = (req, res) => {
    console.log('data is being sent back to UI')
    res.send(projectData);
}

app.post('/data',postAll)

const postAll = (req, res) => {
    console.log('Data is being posted...')
    projectData = req.body;
    res.send(projectData);
    console.log(projectData);
}

app.listen(port, listening);

const listening = ()=>{
    console.log(`Server is Running successfully on port ${port}`);
}
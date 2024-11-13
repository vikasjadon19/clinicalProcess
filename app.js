const express = require('express');
const app = express();
const cors = require('cors');
const clinicalDataRoute = require('./src/routes/clinicalData.route')

app.use(cors({
    origin: '*'
}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));


app.use('/', clinicalDataRoute)

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(3000, () => console.log('server running on port 3000!'));

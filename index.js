const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const staticDirectory = `${__dirname}/dist/angular`;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(staticDirectory));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
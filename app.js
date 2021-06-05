const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/favicon.ico', (req, res) => {
	res.sendFile(`${__dirname}/public/img/favicon/favicon.ico`)
})

app.listen(8080, () => console.log('started server'));

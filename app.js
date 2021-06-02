const express = require('express');
const app = express();
const path = require('path');
// const favicon = require('serve-favicon');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//   favicon(path.join(__dirname, 'public', 'img', 'favicon', 'favicon.ico'))
// );

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.listen(8080, () => console.log('started server'));

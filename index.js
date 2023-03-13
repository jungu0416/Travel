const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('map.html')
});

app.listen(port, () => {
	console.log(port, '번 포트에서 대기 중');
});
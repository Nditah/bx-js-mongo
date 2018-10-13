

require('mongoose').connect('mongodb://localhost/bx-js-mongo');

const app = require('express')();
const bp = require('body-parser');
const port = process.env.port || 5000;
const cors = require('cors');

app.use(cors())

app.use(bp.json());
app.use(bp.urlencoded({extended : true}));

app.use((req, res, next) => {
    req.query.limit = parseInt(req.query.limit) || 30;
    req.query.skip = parseInt(req.query.skip) || 0
    next();
})



app.use('/admins', require('./routes/admins'))
app.use('/tickets', require('./routes/tickets'))
app.use('/traders', require('./routes/traders'))
app.use('/payments', require('./routes/payments'))
app.use('/trades', require('./routes/trades'))
app.use('/apiKeys', require('./routes/apiKeys'))
app.use('/blogs', require('./routes/blogs'))
app.use('/currencies', require('./routes/currencies'))
app.use('/mails', require('./routes/mails'))
app.use('/languages', require('./routes/languages'))
app.use('/notifications', require('./routes/notifications'))
app.use('/polls', require('./routes/polls'))
app.use('/settings', require('./routes/settings'))
app.use('/templates', require('./routes/templates'))
app.use('/votes', require('./routes/votes'))
app.use('/operators', require('./routes/operators'))
app.use('/fees', require('./routes/fees'))
app.use('/markets', require('./routes/markets'))
app.use('/deposits', require('./routes/deposits'))
app.use('/withdrawals', require('./routes/withdrawals'))
app.use('/translations', require('./routes/translations'))

app.use((err,req, res, next) => {
    console.error(err);
    let objError = err.toString() == "[object Object]";
    res.status(objError ? 400 : 501).json(objError ? err : {error : err.toString()})
})


app.listen(port, () => {
    console.log('CRUD APP ONLINE AT port: '+ port);
})
import * as express from 'express';
import * as session from 'express-session';
import * as cookie from 'cookie-parser';
import * as path from 'path';
import { userRouter } from './user/user.router';

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, '../../web-app/dist/flux-web-app')));
app.use(session({secret: 'secret', cookie: {maxAge: 9999999}, saveUninitialized: true, resave: true}));
app.use(cookie('secret'));
app.use(userRouter);

app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname, '../../web-app/dist/flux-web-app/index.html'));
});

app.listen(3000);

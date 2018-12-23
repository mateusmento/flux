import { Router } from 'express';
import { UserCredentials, User } from './user.model';
import { UserService } from './user.service';

export let userRouter: Router = Router();


userRouter.post('/authenticate-user', function(req, res){

    let credentials: UserCredentials = req.body;
    let userService = new UserService();
    let user = userService.authenticateUser(credentials);
    req.session.user = user;

    res.json({error: !user});

});

userRouter.post('/create-user', function(req, res){

    let userService = new UserService();

    try {
        let newUser: User = req.body;
        userService.createUser(newUser);
        res.json({error: false});
    } catch (err) {
        res.json({error: true, msg: err.msg});
    }

});

userRouter.post('/findby-username', function(req, res){
    let username = req.body.username;
    let userService = new UserService();
    let user = userService.findUser(username);
    res.json(user);
});

userRouter.post('/findby-email', function(req, res){
    let email = req.body.email;
    let userService = new UserService();
    let user = userService.findUserByEmail(email);
    res.json(user);
});

- Create a repsitory

- Initialize the repository

- add .gitignore file to ignore node_modules

- push code to remote origin

- use that route above which have more ////

- use / route in bottom

- Install postman api and make a workspace/collection -> test api call

- http://localhost:7860/user?userId=101&password=1234 then console.log(req.query) => { userId: '101', password: '1234' } here ? optional

- http://localhost:7860/user/103/samir/2345 and with code "/user/:userId/:userName/:password" then console.log(req.params) => { userId: '103', userName: 'samir', password: '2345' }

- "/ab?c" -> it means that we can remove b or not

- "/a(bd)?c" -> it means that we can remove bd or but not a and c

- "/ab+c" -> it means that we can add many times b to next b -> eg . abbbbbbbbb...c

- "/a(bc)+d" -> it means that we can add many times b to next b -> eg . abcbcbcbc...d

- "/ab\*(astress)cd" -> it means that we can add anything in between ab and cd.

- /a/ in this we not use " " , it means we can add anything but it includes a .

- /.\*fly$/ in this also we not use "" , it means we can add anything but it includes fly -> eg. butterfly

- Write a dummy auth middleware for all user routes , except /user/login

- Error handling using app.use ("/" , (err, req , res , next) => {})

- Create a free cluster on MongoDB official website (Mongo Atlas)

- Install mongoose library

- Connect application to the Database "connection-url"/devTinder

- Call the connectDB function and connect to database before starting application on 7860

- Create a userSchema & user Model

- Create /signup API to add data to database

- Push some document using API call from postman

- Error handling using try catch

- Add the express.json() middleware to app

- Made /signup API dyanamic to recieve data from the end user

- API - feed API - GET /feed - get all the users from the database

- API - Get user by ID

- Create a delete user API

- API - update the user

- Explore the Mongoose Documentation for Model methods

- Create a custom validate function for gender

- Put all appropriate validations on each field in Schema

- Add timestamps to the userSchema

- Add API level validation on Patch requests & signup post api

- Explore validator library npm i validator , and validate email , password and photoURL

- Create Login API

- Compare passwords and throw errors if email or password is invalid

- install cookie-parser

- just send a dummy cookie to user

- create GET /profile API and check if you get the cookie back

- install jsonwebtoken

- In login API , after email and password validation , create a JWT token and send it to user in cookie

- Read the cookies inside your profile

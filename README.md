# imgShare

social network app with Nodejs and MongoDB 
hosted at: https://imgshare-app.herokuapp.com

Used Nodejs modules like:

Express (framework): to create the server (backend),
express-handlebars (templates engine): to build semantic templates effectively with no frustation,
mongoose: to connect my app to mongoDB database,
morgan: to help me see the client requests in console,
multer: to upload the images to server, 
fs-extra: Filesystem, to manage the files when they are in the server (i used -extra to handle promises and async-await),
errorhandler: to paint the client an error when they access a route that doesn't exist,
md5: Gravatar, to generate random profile images to the users that make comments in the app.
moment: to convert the default timestamp to "___" minutes/hours ago
express-session: to build sessions in the server (to authentication)
passport: handle the session of the user
passport-local: have always the user info to see if it is auth or not 
bcryptjs: to hash users passwords 
connect-flash: to send messages to the client via frontend 

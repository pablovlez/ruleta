(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

if(process.env.NODE_ENV === "development"){
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
//Initializations
const app = express();
require('./database');
//Settings
app.set('port',process.env.PORT || 3000);

//Middleware
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime()+ path.extname(file.originalname))
    }
})

//app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false})); //recive JSON from form
app.use(express.json()); //recive JSON native
app.use(cors());
//Routes
app.use('/api/personas', require('./routes/personas'));
app.use('/api/ruleta', require('./routes/ruleta'));

//Static fields
app.use(express.static(path.join(__dirname, 'public')));

//Start the server
app.listen(app.get('port'),() => {
    console.log('Server en port' , app.get('port'));
});
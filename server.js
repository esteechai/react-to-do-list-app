let express = require ('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000;
let http = require("http");
let app = express(); 
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

let pool = new pg.Pool({
    user: 'postgres' 
    host: 'localhost',
    database: 'postgres',
    password: '123456';
    port: 5432,
}); 


app.use(function(request, response, next)){
    response.header("Acess-Control-Allow-Origin", "*");
    response.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api', function (request, response){ 
     var item_name = request.body.item_name;
     var item_desc = request.body.item_desc;
  
 pool.connect((err, db, done) => {
 if(err){
    return console.log(err);
 } else{
    db.query('INSERT INTO public.item (item_name, item_desc) VALUES ($1, $2)', [item_name, item_desc,] (err, table) =>{
    done(); 
      if(err){
         return console.log(err)
     } else{
         console.log('DATA INSERTED');
         db.end();
     }
    })
 }          
})  
});


app.listen(PORT, () => console.log('Listening on port' +PORT));
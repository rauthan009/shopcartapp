const express=require('express');
const engine = require('ejs-locals');



const srv=express();
const{
    db
}=require('./db')

srv.engine('ejs', engine);
srv.set('view engine', 'ejs');

const cart=require('./routes/cart');
const products=require('./routes/products');
const shopping=require('./routes/shopping');
const vendor=require('./routes/vendors');
srv.use(express.json())
srv.use(express.urlencoded({extended:true}))
srv.use('/',express.static(__dirname+'/public'))
srv.use('/',shopping);
srv.use('/',vendor);
srv.use('/',products);
srv.use('/',cart);
srv.use((req,res)=>{res.send(`<h1>404 Page Not Found</h1> <h2>The page does not exist</h2>`)});

db.sync()
  .then(() => {
    const port=process.env.PORT||4200
    srv.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`)
    })
  })
  .catch(console.error)

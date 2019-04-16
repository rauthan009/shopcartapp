const sequelize=require("sequelize");
const db=new sequelize({
    dialect: 'sqlite',
    storage:__dirname+'/application.db'
})
const vendors=db.define('vendor',{
    name:{
        type: sequelize.STRING,
        allowNull: false
    }
});
const users=db.define('user',{
    username:{
        type:sequelize.STRING,
        allowNull: false
    },
    email:{
        type: sequelize.STRING,
        allowNull: false
    }
})
const products=db.define('product',{
    name:{
        type: sequelize.STRING,
        allowNull: false
    },
    price:{
        type: sequelize.NUMBER,
        allowNull: false
    },
    qty:{
        type: sequelize.NUMBER,
        allowNull: false
    },
})
const cartItems=db.define('cartitem',{
    qty: sequelize.INTEGER
})

vendors.hasMany(products,{foreignKey:{allowNull:false},onDelete:'CASCADE'});
products.belongsTo(vendors,{foreignKey:{allowNull: false},onDelete:'CASCADE'});
cartItems.belongsTo(products,{onDelete:'CASCADE'});
cartItems.belongsTo(users,{onDelete:'CASCADE'});
users.hasMany(cartItems,{foreignKey:{allowNull: false},onDelete:'CASCADE'});
products.hasMany(cartItems,{foreignKey:{allowNull: false},onDelete:'CASCADE'})
module.exports={
    db,vendors,products,users,cartItems 
}
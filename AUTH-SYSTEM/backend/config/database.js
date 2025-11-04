const {Sequelize}= require ('sequelize');
require ('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.Db_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: "mysql",
        pool:{
            max:5,
            min:0,
            acuire:30000,
            idlet: 10000,

        }
    }
);

const testConnection = async( )=>{
    try{
        await sequelize.authenticate();
        console.log('conexio a MySQL establesida correctamente');

    }catch(error){
        console.error('error al conectar con MySQL:',error);
    }
};

module.exports ={
    testConnection,
    sequelize
}


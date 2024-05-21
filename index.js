const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();//Creamos la instancia del servidor express

//middlewares
app.use(express.json());
app.use(cors())

//Iniciamos el servidor
const PORT =  3000;
app.listen(PORT,()=>{
    console.log("Corriendo servidor en http://localhost: " + PORT);
})

//Conexion con mysql
const connection = mysql.createConnection({
    host:"127.0.0.1",
    usuario:"admin",
    password:"202223672",
    port: 3306,
    database:"topicos"
})
connection.connect((err)=>{
    if(err){
        //throw err
        console.error(err.message || "No se pudo conectar a la base de datos");
    }else{
        console.log("Conectado a la base de datos")
    }
})

app.get("/", (req,res)=>{
    connection.query('SELECT * FROM  usuarios',(error,resul)=>{
        if(error) res.status(500).json({message:error.message || "No se puede obtener datos en este momento"});
        else res.status(200).json(resul);
    });
});

app.post("/", (req,res)=>{
    connection.query(`INSERT INTO usuarios VALUES (DEFAULT, "`+nombre+'")',(error,resul)=>{
        if(error) res.status(500).json({message:error.message || "No se puede insertar el dato en este momento"});
            else res.json(resul);
    });
});
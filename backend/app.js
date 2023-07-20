const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = 4000;
const helmet = require('helmet');
const jwt = require('jsonwebtoken')
const cors = require('cors');



const con =  require('./db.js').conexion

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});


app.use(cors({
    origin: '*'
}));


//pre-flight requests
app.options('*', function(req, res) {
	res.send(200);
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	/* eslint-disable no-console */
	console.log('Node Endpoints working :)');
});

module.exports = server;

app.get('/', (err, res) => {
	res.status(200);
	res.send({alo: 'bb', sirve: 'perra'});
	res.end();
});

app.post('/', (err, res) => {

    con.connect(function() {
    con.query("SELECT * FROM usuario", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    });

	res.status(200);
	res.send({alo: 'bb', sirve: 'perra'});
	res.end();
});

app.put('/', (err, res) => {
	res.status(200);
	res.send('working');
	res.end();
});


//admin

app.post('/user/create', (req,res)=>{
    var existe = false
    con.connect(function(){
        con.query(`SELECT * FROM usuario WHERE email='${req.body.email}'`,function (err, result, fields){
            console.log(result)
            if(result.length>0){
                existe =true
                res.status(301);
                res.send({error: 'Email ya esta siendo usado'})
                res.end()
            }else{
                con.query(`INSERT INTO usuario(email, contrasena) VALUES('${req.body.email}',MD5('${req.body.contrasena}'))`, function (err, result, fields){
                    if(err) throw err;
                });
                res.status(200);
                res.send({respuesta: 'Usuario creado exitosamente'})
                res.end()
            }
        })
        

        
    })
})

const secret = 'asdwewqewqesd'
const verifyToken = (req, res, next) => {
    // console.log(req)
    // console.log(req.rawHeaders[1].split(" ")[1])

    const token =
      req.body.token || req.query.token || req.headers["x-access-token"] || req.rawHeaders[1].split(" ")[1]
      console.log('tok',jwt.verify(token, secret))
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };

//token
app.post('/auth/jwt/create', (req,res) =>{

    body= req.body
    console.log(req.body)
    console.log(body.email)

    con.connect(function(){
        con.query(`SELECT * FROM usuario us LEFT JOIN rol r ON us.rolusuario = r.id WHERE us.email='${body.email}' AND us.contrasena=MD5('${body.contrasena}') AND r.tipo='admin' LIMIT 1`,function (err, result, fields){
            console.log(result)
            if(typeof result != "undefined"){
                email = result[0].email
                nombre = result[0].nombre
                apellido =result[0].apellido
                res.status(200);
                // res.send({respuesta: 'Usuario administrador existe'})
                
                const token = jwt.sign({
                    nombre,
                    apellido,
                    email,
                    exp: Date.now() + 6000 * 1000
                }, secret)
            
                res.send({token})
                res.end()
            }else{
                res.status(401);
                res.send({respuesta: 'Usuario administrador no existe'})
                res.end()
            }
        })
    })
})


app.post('/generarAdmin', (req,res) =>{
    body= req.body
    con.connect(function(){
        con.query(`INSERT INTO usuario(nombre,apellido,contrasena,rol,email,rolusuario) VALUES('${body.nombre}', '${body.apellido}',MD5('${body.contrasena}'),'admin','${body.email}',2) `)

        res.status(200);
        res.send({respuesta: 'Usuario administrador creado exitosamente'})
        res.end()
    })
})




//usuario

app.post('/usuario', (req,res)=>{
    body =req.body

    console.log(body)
    con.connect(function(){
        con.query(`INSERT INTO usuario(nombre,apellido,tipo_documento,documento,email,rolusuario) VALUES('${body.nombres}', '${body.apellidos}','${body.tipo_documento}','${body.documento}','${body.email}',1) `)

        res.status(200);
        res.send({respuesta: 'Usuario resigrado exitosamente'})
        res.end()
    })

})


app.get('/usuario/lista', (req,res)=>{
    body= req.body;

    con.connect(function(){
        con.query(`SELECT * FROM usuario us LEFT JOIN rol r ON us.rolusuario = r.id WHERE r.tipo='usuario'`, function(err, result, fields){
            console.log(result)

            res.status(200);
            res.send(result)
            res.end()
        })

        
    })
})


//reserva


app.post('/reserva', (req,res)=>{
    body =req.body
    console.log(body)
    con.connect(function(){
        con.query(`INSERT INTO reserva(tipo_reserva,cantidad_personas,estado,usuario,descripcion,fecha_reserva) VALUES('${body.tipo_reserva}', '${body.cantidad_personas}','${body.estado}','${body.usuario}','${body.descripcion}','${body.fecha}') `)
        res.status(200);
        res.send({respuesta: 'Reserva resigrada exitosamente'})
        res.end()
    })
})


app.get('/reserva/lista', (req,res)=>{
    body= req.body;

    con.connect(function(){
        con.query(`SELECT * FROM usuario us RIGHT JOIN reserva re ON us.id = re.usuario  `, function(err, result, fields){
            res.status(200);
            res.send(result)
            res.end()
        })
    })
})

app.post('/reserva/detalle', (req,res)=>{
    body= req.body;
    console.log(body)
    console.log(Object.keys(body))
    var hero = JSON.parse(Object.keys(body))
    console.log(hero.id)
    con.connect(function(){
        con.query(`SELECT * FROM reserva re LEFT JOIN usuario us ON re.usuario = usuario.id WHERE id=${hero.id}  `, function(err, result, fields){
            // console.log(result)
            if(result?.length>0){
                // console.log(result)
                res.status(200);
                res.send(result[0])
                res.end()
            }else{
                res.status(401);
                res.send({error: "no existe"})
                res.end()
            }
            
        })
    })
})

app.post('/reserva/confirmar', (req,res)=>{
    body= req.body;
    console.log(body)
    // console.log(Object.keys(body))
    // var hero = JSON.parse(Object.keys(body))
    // console.log(hero.id)
    con.connect(function(){
        con.query(`UPDATE reserva SET estado = 'confirmado' WHERE reserva.id =${body.id}  `, function(err, result, fields){
            
            res.status(200);
            res.end()
            
            
        })
    })
})


app.get('/public', (req,res) =>{
    const token = null;
    res.send('publico')
})


app.get('/private', verifyToken, (req,res) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token, secret)

        if(Date.now() > payload.exp) return res.status(401).send({error: 'token expired'})
        res.send('private')
    } catch (error){
        res.status(401).send({error: 'errror'})
    }
})
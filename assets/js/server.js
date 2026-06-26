import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const caixaForteApp = express();
caixaForteApp.use(express.json());
let dados;

caixaForteApp.use(cors());

// Cria a conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',       // ou o IP do seu servidor MySQL
    user: 'teste',     // ex: root
    password: 'teste',   // senha do seu banco
    database: 'teste'    // nome do banco de dados
});
connection.connect((err) => {
    if(err) throw err;
    console.log('Connectado!');
});


caixaForteApp.get('/consulta', (req, res) => {
    connection.query(
        'SELECT * FROM alunos',
        (err, results, fields) => {
            if (err) throw err;
            res.send(results); // exibe os dados no terminal
        });
});

caixaForteApp.post('/inserir', (req, res) => {
    const novo = req.body;
    connection.query(
        `INSERT INTO alunos (nome_aluno) value ${novo.nome_aluno}`,
        (err, results, fields) => {
            if(!err)
                console.log('cadastro ok');
            else
                console.error('verificar');
        }
    )
});

caixaForteApp.get('/debitos', (req, res)  => {
    res.send('meu teste');
});

caixaForteApp.listen(3000, () => {
    console.log('Api rodando!!');
});

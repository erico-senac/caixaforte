import express from 'express'

const caixaForteApp = express()
caixaForteApp.use(express.json)

caixaForteApp.get('/lancamentos', (req, res) => {
    res.send('meu teste')
})
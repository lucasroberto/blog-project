const express = require('express');
const bodyParser = require('body-parser');
const Lead = require('./public/js/leads')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

// home / index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

// article
app.get('/como-montar-um-coffee-break-para-eventos', (req, res) => {
    res.sendFile(__dirname + '/public/articles/como-montar-um-coffee-break-para-eventos.html')
});

app.get('/dicas-para-esquentas-parada-orgulho-lgbt', (req, res) => {
    res.sendFile(__dirname + '/public/articles/dicas-para-esquentas-parada-orgulho-lgbt.html')
});

app.get('/guia-para-planejamento-de-jogos-universitarios', (req, res) => {
    res.sendFile(__dirname + '/public/articles/guia-para-planejamento-de-jogos-universitarios.html')
});

app.get('/como-preparar-uma-palestra-de-sucesso', (req, res) => {
    res.sendFile(__dirname + '/public/articles/como-preparar-uma-palestra-de-sucesso.html')
});

app.get('/corpus-christi-sp-2019', (req, res) => {
    res.sendFile(__dirname + '/public/articles/corpus-christi-sp-2019.html')
});

app.get('/guia-para-organizar-festa-junina', (req, res) => {
    res.sendFile(__dirname + '/public/articles/guia-para-organizar-festa-junina.html')
});

app.get('/passo-a-passo-evento-corporativo', (req, res) => {
    res.sendFile(__dirname + '/public/articles/passo-a-passo-evento-corporativo.html')
});


// get leads
app.post('/leads', (req, res) => {
    const teste = req.body;
    const lead = Lead.newLead(teste);
    res.send("Obrigado por se cadastrar. Vamos te tirar do tédio! ;)")
});


// get csv
app.get('/mailing-list-csv', (req, res) => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment: filename\"' + 'mailing.csv"');
    Lead.getCsv((data) => {
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
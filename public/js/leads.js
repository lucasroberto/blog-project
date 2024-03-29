const firebase = require('../../server/firebase');

const iconv = require('iconv-lite');
const csv = require('csv-stringify');

const newLead = dataForm => {
    let date = new Date();
    let brDate = date.toLocaleDateString('pt-BR')
    let brTime = date.toLocaleTimeString('pt-BR')
    const leads = firebase.database().ref('leads');
    const lead = leads.push([dataForm.email, dataForm.name, , dataForm.ip, 'B2C' , `${brDate} ${brTime}`]);
    return lead;    
};

const getCsv = (callback) => {
    const leads = firebase.database().ref('leads');
    const data = [['email', 'nome', 'ip', 'tipo', 'data_hora']];
    leads.on('value', (snapshot) => {
        snapshot.forEach((lead) => {
            const leadData = lead.val();
            data.push([leadData[0], leadData[1], leadData[3],leadData[4],leadData[5]])
        });
        csv(data, (err, output) => {
            callback(output);
        })
    });
};

module.exports = {
    newLead,
    getCsv,
}
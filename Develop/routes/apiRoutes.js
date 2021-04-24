const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    // app.get('/api/notes', (req, res) => res.json(noteTaken));
    const readFile = util.promisify(fs.readFile);

    app.get('/api/notes', (req, res) => {
        let data;
        readFile('./db/db.json', 'utf8').then(notes => {
            try {
                data = JSON.parse(notes);
                console.log(data);

            }
            catch (err) {
                console.log('error :' + err);
                data = [];
            }
            return res.json(data);
        })
    })

    const writeFile = util.promisify(fs.writeFile);

    app.post('/api/notes', (req, res) => {
        let data;
        readFile('./db/db.json', 'utf8').then(notes => {
            try {
                data = JSON.parse(notes);
                console.log(data);

            }
            catch (err) {
                console.log('error :' + err);
                data = [];
            }
            data.push({
                title: req.body.title,
                text: req.body.text,
                id: uuidv4()
            })


            writeFile('./db/db.json', JSON.stringify(data)).then(notes => {
                try {
                    data = JSON.parse(notes);
                    /// POST NEW NOTE HERE

                    console.log(data);
                }
                catch (err) {
                    console.log('error :' + err);
                    data = [];
                }
                return res.json(data);
            })
        })
    })

    app.delete('/api/notes/:id', (req, res) => {
        let data;
        readFile('./db/db.json', 'utf8').then(notes => {
            try {
                data = JSON.parse(notes);
                console.log(data);

            }
            catch (err) {
                console.log('error :' + err);
                data = [];
            }

            let result = data.filter(post => post.id != req.params.id);

            writeFile('./db/db.json', JSON.stringify(result)).then(notes => {
                try {
                    result = JSON.parse(notes);
                    /// POST NEW NOTE HERE

                    console.log(result);
                }
                catch (err) {
                    console.log('error :' + err);
                    result = [];
                }
                return res.json(result);
            })
        })
    })
}
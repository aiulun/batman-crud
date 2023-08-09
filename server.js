const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = 8001
const connectionString = 'mongodb+srv://aiulun:batman123@cluster0.51ijnfp.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database')

        const db = client.db('batman-actors')
        const actorsCollection = db.collection('actors')

        app.use(express.static('public'))
        app.set('view engine', 'ejs')
        app.use(cors())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

        app.get('/', (request, response) => {
            actorsCollection
                .find()
                .toArray()
                .then(results => {
                    response.render('index.ejs', { actors: results })
                })
                .catch(error => console.error(error))
            
        })
        
        app.post('/actors', (request, response) => {
            actorsCollection
                .insertOne(request.body)
                .then(result => {
                    response.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/actors', (request, response) => {
            actorsCollection
                .findOneAndUpdate(
                    { name: 'Christian Bale' }, 
                    {
                        $set: {
                            name: request.body.name,
                            movie: request.body.movie,
                            year: request.body.year,
                        },
                    },
                    {
                        upsert: true,
                    }
                )
                .then(result => {
                    response.json('Success')
                })
                .catch(error => console.error(error))
        })

        app.delete('/actors', (request, response) => {
            actorsCollection
                .deleteOne({ name: request.body.name })
                .then(result => {
                    if (result.deletedCount === 0) {
                        return response.json('No movie to delete')
                    }
                    response.json("Deleted Ben Affleck's movie")
                })
                .catch(error => console.error(error))
        })

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(error => console.error(error))

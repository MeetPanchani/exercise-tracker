const router = require('express').Router()
let Exercise = require('../models/exercise.model')

router.get('/', (req, res) => {
    Exercise.find()
        .then(exercises => res.send(exercises))
        .catch(err => res.status(400).send('Error: ' + err))
})

router.post('/add', (req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
    .then(() => res.send('Exercise added'))
    .catch(err => res.status(400).send('Error: ' + err))
})  

router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            if(!exercise){
                return res.status(404).send()
            }
            res.send(exercise)})
        .catch(err => res.status(400).send('Error: ' + err))
})

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.send('Exercise deleted'))
        .catch(err => res.status(400).send('Error: ' + err))
})

router.post('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username
            exercise.description = req.body.description
            exercise.duration = Number(req.body.duration)
            exercise.date = Date.parse(req.body.date)

            exercise.save()
                .then(() => res.send('Exercise updated'))
                .catch(err => res.status(400).send('Error: ' + err))
        })
        .catch(err => res.status(400).send('Error: ' + err))
})
module.exports = router
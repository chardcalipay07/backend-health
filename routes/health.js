const router = require('express').Router();
const { ModuleNode } = require('vite');
let Health = require('../models/health.model')

//Home
router.route('/').get((req, res) => {
    try{
        Health.find()
            .then(health => res.json(health))
    } catch(e) {
        res.status(400).json("Error: ", e)
    }
    
})

//Add
router.route('/add').post((req, res) => {
    const fullname = req.body.fullname;
    const temperature = req.body.temperature;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    const newHealthDeclaration = new Health({fullname, temperature, email, phonenumber})

    try{
        newHealthDeclaration.save()
            .then(health => res.json('New Record Added'))
    } catch(e){
        res.status(400).json("Error: ", e)
    } 
        
})

//details
router.route('/:id').get((req, res) => {
    try{
        Health.findById(req.params.id)
            .then(health => res.json(health))
    } catch(e) {
        res.status(400).json("Error: ", e)
    }
})

//delete
router.route('/:id').delete((req, res) => {
    try{
        Health.findByIdAndDelete(req.params.id)
            .then(health => res.json("Record was deleted"))
    } catch(e) {
        res.status(400).json("Error: ", e)
    }
})

//update
router.route('/update/:id').post((req, res) => {
    try{
        Health.findById((req.params.id))
            .then(health => {
                health.fullname = req.body.fullname;
                health.temperature = req.body.temperature;
                health.email = req.body.email;
                health.phonenumber = req.body.phonenumber;

                health.save()
                    .then(() => res.json('record was updated'))
            })
    } catch(e) {
        res.status(400).json("Error: ", e)
    }
})

module.exports = router
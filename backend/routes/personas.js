const { Router } = require('express');
const router = Router();
const {unlink } = require('fs-extra');

const path = require('path');


const Persona = require('../models/Persona');

router.get('/', async (req, res) => {
    const personas = await Persona.find();
    res.json(personas);
});

router.post('/', async (req, res) => {    
    const {nombre, dinero } = req.body;    
    const newPersona = new Persona({nombre, dinero});    
    await newPersona.save();
    res.json({message:'Persona almacenada con exito'});
});

router.delete('/:id', async (req, res) => {
    const persona = await Persona.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public' + persona.imagePath));
    res.json({message: 'Persona eliminada con exito'});
});

router.put('/:id', async (req, res) => {
    const {nombre, dinero } = req.body;
    const persona = await Persona.findByIdAndUpdate(req.params.id,
        { nombre, dinero }
    );    
    res.json({message: 'Persona actualizada con exito'});
});

router.get('/:id', async (req, res) => {
    const persona = await Persona.findById(req.params.id);
    res.json(persona);
});

module.exports = router;
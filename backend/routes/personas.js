const { Router } = require('express');
const router = Router();
const {unlink } = require('fs-extra');

const path = require('path');


const Persona = require('../models/Persona');

router.get('/', async (req, res) => {
    try {
        const personas = await Persona.find();
        res.json(personas);
    } catch (error) {
        res.json({
            message:'Ha ocurrido un error',
            error
        });
    }
    
});

router.post('/', async (req, res) => {    
    try {
        const {nombre, dinero } = req.body;
        console.log(req);
        const newPersona = new Persona({nombre, dinero});    
        await newPersona.save();
        res.json({message:'Persona almacenada con exito'});
    } catch (error) {
        res.json({
            message:'Ha ocurrido un error',
            error
        });
    }
    
});

router.delete('/:id', async (req, res) => {
    try {
        const persona = await Persona.findByIdAndDelete(req.params.id);        
        res.json({message: 'Persona eliminada con exito'});
    } catch (error) {
        res.json({
            message:'Ha ocurrido un error',
            error 
        });
    }
    
});

router.put('/:id', async (req, res) => {
    try {
        const {nombre, dinero } = req.body;
        const persona = await Persona.findByIdAndUpdate(req.params.id,
        { nombre, dinero }
        );    
        res.json({message: 'Persona actualizada con exito'});
    } catch (error) {
        res.json({
            message:'Ha ocurrido un error',
            error 
        });
    }
    
});

router.get('/:id', async (req, res) => {
    const persona = await Persona.findById(req.params.id);
    res.json(persona);
});

module.exports = router;
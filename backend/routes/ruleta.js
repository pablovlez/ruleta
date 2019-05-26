const { Router } = require('express');
const router = Router();
const path = require('path');

const Persona = require('../models/Persona');
// api/ruleta/jugar/:color
router.get('/jugar/:color',async (req, res) => {
    let personas = await Persona.find();    
    let colorRuleta = req.params.color;
    console.log('color ruleta', colorRuleta);
    personas.forEach(async persona => {
        let dineroApostado = apostar(persona.dinero);
        let colorApostado = selecionarColor();
        let dineroGanado = cobrar(colorRuleta, colorApostado, dineroApostado);        
        await Persona.findByIdAndUpdate(persona._id,{
            apostado: dineroApostado, 
            color: colorApostado,
            ganancia: dineroGanado,
            dinero: persona.dinero + dineroGanado - dineroApostado
        });        
        dineroApostado = 0;
        colorApostado = '';
        dineroGanado = 0;
    });
    
    return res.json({
        color: colorRuleta,
        data: personas             
    })
})


function apostar(dinero){
    if (dinero<=0){
        return 0;
    }

    if(dinero <= 1000){
        return dinero;
    }else{
        min = (dinero * 8) / 100;
        max = (dinero * 15) / 100;
        return Math.round((Math.random() * (max - min)) + min);
    }

}

function selecionarColor(){
    const colores = ['verde','rojo', 'negro'];    
    const random = Math.round((Math.random() * 100 + 1));

    if (random > 98){
        return colores[0];
    }else{
        const rand2 =  Math.round(Math.random() * (2 - 1)) + 1;
        return colores[rand2];
    }
}

function cobrar(colorRuleta, colorApostado, dineroApostado){
        
    if (colorRuleta === colorApostado) {
        console.log('acierta el color');
        if (colorApostado==='verde'){
            return dineroApostado * 15;
        }else{
            return dineroApostado * 2;
        }    
    }else{
        console.log('no acierta el color');
        return 0;
    }
}

module.exports = router;
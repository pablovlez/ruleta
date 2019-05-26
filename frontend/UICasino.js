import RuletaService from './services/RuletaService';
const ruletaService = new RuletaService();

import {format} from 'timeago.js';

class UICasino {
    async jugar(colorRuleta){
        await ruletaService.jugar(colorRuleta);
        return true;        
    }   

    colorRuleta(){
        const colores = ['verde','rojo', 'negro'];    
        const random = Math.round((Math.random() * 100 + 1));

        if (random > 98){
            return colores[0];
        }else{
            const rand2 =  Math.round(Math.random() * (2 - 1)) + 1;
            return colores[rand2];
        }
    }

    renderResultadoRuleta(colorRuleta){
        const cardResultado = document.getElementById('resultado');
        cardResultado.innerHTML = '';
        //const colorRuleta = this.colorRuleta();
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="card-text">Color : ${colorRuleta}</p>
        `;
        cardResultado.appendChild(div);
    }
    
}

export default UICasino;
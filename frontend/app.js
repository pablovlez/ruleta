import './styles/app.css';
import UICasino from './UICasino';
import UIPersona from './UIPersona';

document.addEventListener('DOMContentLoaded', async () =>{
    
    const uiCasino = new UICasino();
    const uiPersona = new UIPersona();
    
    const colorRuleta = uiCasino.colorRuleta();
    uiCasino.renderResultadoRuleta(colorRuleta);
    await uiCasino.jugar(colorRuleta);
    uiPersona.renderJugadores();
    //uiPersona.renderJugadores();
    //uiPersona.renderJugadores();
})

document.getElementById('jugadores')
    .addEventListener('click', (e) => {   
        const uiPersona = new UIPersona();        
        uiPersona.renderMaestroPersona();
        adicionarEventosPersona();
        e.preventDefault();
    }); 

function adicionarEventosPersona(){
    document.getElementById('persona-form')
        .addEventListener('submit', e => {
            
            const nombre = document.getElementById('nombre').value;
            const dinero = document.getElementById('dinero').value;                   
            const accion = document.getElementById('accion').value;
            const _id = document.getElementById('_id').value;

            const formData = new FormData();
            
            formData.append('nombre',nombre);
            formData.append('dinero', dinero);        
            
            const uiPersona = new UIPersona();
            if(accion==="nuevo"){
                uiPersona.addNewPersona(formData);
            }else{
                uiPersona.updatePersona(_id, formData);
            }               
            e.preventDefault();
        });

    document.getElementById('personas-cards')
        .addEventListener('click', (e) => {
            if(e.target.classList.contains('delete')){            
                const uiPersona = new UIPersona();
                uiPersona.deletePersona(e.target.getAttribute('_id'));
                e.preventDefault();
            }        
        });
    
    document.getElementById('personas-cards')
        .addEventListener('click', (e) => {
            if(e.target.classList.contains('update')){            
                const uiPersona = new UIPersona();
                uiPersona.preparaUpdate(e.target.getAttribute('_id'));
                e.preventDefault();
            }        
        });    
}


   

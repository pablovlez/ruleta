import './styles/app.css';
import UICasino from './UICasino';
import UIPersona from './UIPersona';

document.addEventListener('DOMContentLoaded', async () =>{
    
    const uiCasino = new UICasino();
    const uiPersona = new UIPersona();
    
    const colorRuleta = uiCasino.colorRuleta();
    uiCasino.renderResultadoRuleta(colorRuleta);
    await uiCasino.jugar(colorRuleta);
    await uiPersona.renderJugadores();
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
    
    document.getElementById('dinero')
        .addEventListener("keypress", (e) => {
            var key = window.event ? e.which : e.keyCode;
            if (key < 48 || key > 57) {
            e.preventDefault();
            }
        });
    
    document.getElementById('persona-form')
        .addEventListener('submit', async e => {
            
            const nombre = document.getElementById('nombre').value;
            const dinero = document.getElementById('dinero').value;                   
            const accion = document.getElementById('accion').value;
            const _id = document.getElementById('_id').value;

            const formData = new FormData();
            
            await formData.append('nombre',nombre);
            await formData.append('dinero', dinero);        
            
            const uiPersona = new UIPersona();
            const persona = JSON.stringify({
                nombre,
                dinero
            });
            e.preventDefault();
            if(accion==="nuevo"){
                await uiPersona.addNewPersona(persona);
            }else{
                await uiPersona.updatePersona(_id, persona);
            }               
            
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


   

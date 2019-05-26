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
    return true;
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
        .addEventListener('submit', async (e) => {
            
            const nombre = document.getElementById('nombre').value;
            const dinero = document.getElementById('dinero').value;                   
            const accion = document.getElementById('accion').value;
            const _id = document.getElementById('_id').value;

            const formData = new FormData();
            
            formData.append('nombre',nombre);
            formData.append('dinero', dinero);        
            
            const uiPersona = new UIPersona();
            if(accion==="nuevo"){
                await uiPersona.addNewPersona(formData);
            }else{
                await uiPersona.updatePersona(_id, formData);
            }               
            e.preventDefault();
            return true;
        });

    document.getElementById('personas-cards')
        .addEventListener('click', async (e) => {
            if(e.target.classList.contains('delete')){            
                const uiPersona = new UIPersona();
                await uiPersona.deletePersona(e.target.getAttribute('_id'));
                e.preventDefault();
                return true;
            } 
            return true;       
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


   

import PersonaService from './services/PersonaService';
const personaService = new PersonaService();

import {format} from 'timeago.js';
import { DocumentProvider } from 'mongoose';

class UIPersona {

    async renderMaestroPersona(){
        const container = document.getElementById('container');
        container.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <form id="persona-form" class="card card-body">
                        <div class="form-group">
                            <input type="text" id="nombre" class="form-control" placeholder="Nombre" autofocus>
                        </div>
                        <div class="form-group">
                            <input type="text" id="dinero" class="form-control" placeholder="Dinero" value="10000">
                        </div>
                        <div class="form-group">
                            <input type="hidden" id="_id" class="form-control">
                        </div>                                                
                        <button class="btn btn-primary" id="accion" value="nuevo">
                            Guardar
                        </button>
                    </form>
                </div>
                <div class="col-md-8">
                    <div class="col-md-8" id="personas-cards">                        
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
        await this.renderPersonas();
        return true;
    }

    async renderPersonas(){
        const personas = await personaService.getPersonas();
        const personasCardContainer = document.getElementById('personas-cards');
        personasCardContainer.innerHTML='';
        personas.forEach(persona => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = ` 
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h4 class="card-title">${persona.nombre}</h4>
                        <p class="card-text">Dinero: ${persona.dinero}</p>                                                
                        <a href="#" class="btn btn-secondary update" _id="${persona._id}">Actualizar</a>
                        <a href="#" class="btn btn-danger delete" _id="${persona._id}">Eliminar</a>
                    </div>
                </div>
            `;
            personasCardContainer.appendChild(div);
        });
        return true;
    }

    async renderJugadores(){
        const personas = await personaService.getPersonas();
        const personasCardContainer = document.getElementById('personas-cards');
        personasCardContainer.innerHTML='';
        personas.forEach(persona => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `                
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h4 class="card-title">${persona.nombre}</h4>
                    <p class="card-text">Dinero: ${persona.dinero}</p>                        
                    <p class="card-text">Dinero Apostado: ${persona.apostado}</p>
                    <p class="card-text">Color Apostado: ${persona.color}</p>
                    <p class="card-text">Dinero Ganado: ${persona.ganancia}</p>
                </div>
            </div>
            `;
            personasCardContainer.appendChild(div);
        });
        return true;
    }

    async addNewPersona(persona){
        await personaService.postPersona(persona);
        this.clearPersonaForm();
        this.renderPersonas();
        return true;
    }

    clearPersonaForm(){
        document.getElementById('persona-form').reset();
        document.getElementById('accion').value = 'nuevo';
        document.getElementById('accion').innerHTML = 'Guardar';
    }

    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');
        div.className = "alert alert-${colorMessage}";
    }

    async deletePersona(personaId){
        await personaService.deletePersona(personaId);
        this.renderPersonas();
        return true;
    }

    async updatePersona(personaId, persona){
        await personaService.updatePersona(personaId, persona);
        this.clearPersonaForm();
        this.renderPersonas();
        return true;
    }

    async preparaUpdate(personaId){
        const persona = await personaService.getPersonaById(personaId);
        document.getElementById('nombre').value = persona.nombre;
        document.getElementById('dinero').value = persona.dinero;
        document.getElementById('_id').value = personaId;
        document.getElementById('accion').value = 'editar';
        document.getElementById('accion').innerHTML = 'Modificar';
    }
}

export default UIPersona;
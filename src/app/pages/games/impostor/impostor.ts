import { Component, Input } from '@angular/core';
import { ConfigImpostor } from '../components/config-impostor/config-impostor';
import { BidiModule } from "@angular/cdk/bidi";

@Component({
  selector: 'app-impostor',
  imports: [
    ConfigImpostor,
    BidiModule
],
  templateUrl: './impostor.html',
  styleUrl: './impostor.css',
})
export class Impostor {

  @Input() group:any
  data:any
  participantes:any
  indiceActual = 0;
  mostrarPalabra = false;
  startGame: boolean = false;
  jugadorInicial: any = null;
  direccionInicio: string = '';

  revelarPalabra() {
    this.mostrarPalabra = true;
  }

  siguienteParticipante() {
    this.indiceActual++;
    this.mostrarPalabra = false;

    if (this.indiceActual >= this.participantes.length) {
      this.generarInicioJuego();
    }
  }

  startGameEvent(event:any){
    this.startGame = event
  }

  generarInicioJuego() {
    if (!this.participantes.length) return;

    // jugador aleatorio
    const index = Math.floor(Math.random() * this.participantes.length);
    this.jugadorInicial = this.participantes[index];

    // dirección aleatoria
    this.direccionInicio =
      Math.random() > 0.5
        ? 'Derecha'
        : 'Izquierda';
  }

}

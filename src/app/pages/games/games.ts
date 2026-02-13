import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ConfigImpostor } from './components/config-impostor/config-impostor';
import { NgComponentOutlet } from '@angular/common';
import { Impostor } from './impostor/impostor';

@Component({
  selector: 'app-games',
  imports: [
    MatIcon,
    NgComponentOutlet
  ],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class Games implements OnChanges {
  
  @Input() group:any;
  @Output() gameSelected = new EventEmitter<any>();
  games:any 
  juegoSeleccionado: any = null;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['group']){
      this.games = [
        { nombre: '¿Quien es el Impostor', icon: 'quiz', component: Impostor, inputs: {
            group: this.group.id
        } },
      ];
    }
  }
  

  accederJuego(game: any) {
    console.log(game)
    this.gameSelected.emit(false)
    this.juegoSeleccionado = game;
  }
  
  volverAJuegos() {
    this.gameSelected.emit(true)
    this.juegoSeleccionado = null;
  }

}

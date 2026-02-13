import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './service/app';
import { Header } from "./layouts/header/header";
import { DatePipe } from '@angular/common';
import { Group } from "./pages/group/group";
import { Games } from './pages/games/games';

enum Step {
  PARTICIPANTES = 1,
  JUEGOS = 2,
  RESULTADOS = 3
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, DatePipe, Group, Games],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [AppService]
})
export class App {
  

  stepActual = Step.PARTICIPANTES;

  groups: any = [];
  showGames:boolean = false;
  showVolver : boolean = true;

  constructor(
    private apiService: AppService
  ) {}

  async ngOnInit() {
    this.getGroups();
    const paletaGuardada = localStorage.getItem('paletaUsuario');
    if (paletaGuardada) {
      this.cambiarPaleta(JSON.parse(paletaGuardada));
    } else {
      // Aplicar paleta default si no hay guardada
    }
  }

  getGroups(){
    this.apiService.getGroups().subscribe({
      next: (response) => {
        this.groups = response;
        console.log('Groups:', this.groups);
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      }
    });
  }

  cambiarPaleta(paleta: { [key: string]: string }) {
    const root = document.documentElement;
    Object.entries(paleta).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }

  guardarPaleta(paleta: { [key: string]: string }) {
    localStorage.setItem('paletaUsuario', JSON.stringify(paleta));
    this.cambiarPaleta(paleta); // aplicar inmediatamente
  }

  grupoSeleccionado: any = null;

  ingresarGrupo(grupo: any) {
    this.grupoSeleccionado = grupo;
  }

  prev() {
    if (this.stepActual > 1) {
      this.stepActual--;
    }else{
      this.grupoSeleccionado = null
    }
  }

  next(){
    this.stepActual++;
  }

  listenSelect(event:any){
    this.showVolver = event
  }

}

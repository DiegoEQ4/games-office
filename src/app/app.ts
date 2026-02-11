import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './service/app';
import { Header } from "./layouts/header/header";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [AppService]
})
export class App {
  groups: any = [];

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

  ingresarGrupo(grupo: any){
    // Lógica para ingresar al grupo
    console.log('Ingresando al grupo:', grupo);
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

}

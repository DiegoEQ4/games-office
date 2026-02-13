import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  dropdownOpen = false;

  paletas = [
    {
      nombre: 'Azul',
      colores: {
        'color-fondo': '#0f172a',
        'color-card': 'rgba(30, 41, 59, 0.9)',
        'color-texto': '#ffffff',
        'color-cyan': '#1a7ff1',
        'color-cyan-hover': '#3b82f6',
        'color-texto-sec': '#f0f9ff'
      }
    },
    {
      nombre: 'Rosa',
      colores: {
        'color-fondo': '#ffe4e6',
        'color-card': '#ffd6dc',
        'color-texto': '#5c3a3e',
        'color-cyan': '#f9a8d4',
        'color-cyan-hover': '#f472b6',
        'color-texto-sec': '#7f5a66'
      }
    }
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
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

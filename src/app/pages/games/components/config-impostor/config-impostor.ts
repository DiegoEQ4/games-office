import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../../service/app';

@Component({
  selector: 'app-config-impostor',
  imports: [
    FormsModule
  ],
  templateUrl: './config-impostor.html',
  styleUrl: './config-impostor.css',
})
export class ConfigImpostor {

  @Input() group:number = 0;
  @Output() start = new EventEmitter<any>()
  @Output() participants = new EventEmitter<any>()


  apiService = inject(AppService)

  config = {
    dificultad: 'facil',
    categoria: ''
  };

  empezar(){
    console.log(this.group)
    this.apiService.loadImpostor(this.group,this.config).subscribe({
      next: (value) => {
        this.start.emit(true)
        this.participants.emit(value)
        console.log(value)
      },
      error(err) {
        console.error(err)
      },
    })
  }
}

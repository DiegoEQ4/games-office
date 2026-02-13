import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../../service/app';

@Component({
  selector: 'app-group',
  imports: [
    DatePipe
  ],
  templateUrl: './group.html',
  styleUrl: './group.css',
})
export class Group implements OnChanges{

  @Input() group:any
  participants:any = []

  constructor(
    private apiService:AppService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['group']){
      this.getParticipants()
    }
  }
  
  toggleActive(item: any) {

    const newState = !item.isActive;

    // UI optimista (cambia primero visualmente)
    item.isActive = newState;

    this.apiService.updateParicipantState(item.id, newState).subscribe({
      next: () => {
        console.log('Estado actualizado');
      },
      error: (err) => {
        console.error('Error actualizando estado', err);
        // Si falla, revertimos el cambio
        item.isActive = !newState;
      }
    });

  }



  getParticipants(){
    this.apiService.getParticipantsByGroup(this.group.id).subscribe({
      next: (response) => {
        this.participants = response;
        console.log('Participants:', this.participants);
      },
      error: (error) => {
        console.error('Error fetching participants:', error);
      }
    });
  }
}

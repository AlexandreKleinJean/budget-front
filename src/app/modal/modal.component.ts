import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  standalone: true
})

export class ConfirmationModalComponent {

  // Msg de la modal => reçu du parent
  @Input() message: string;

  // Choix de confirmer ou non => envoyé au parent
  @Output() choice = new EventEmitter<boolean>();


  confirm() {
    this.choice.emit(true);
  }

  cancel() {
    this.choice.emit(false);
  }
}

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  @Input() itemId!: number;

  constructor(public activeModal: NgbActiveModal) { }

  confirmDelete(): void {
    // Call delete service method with itemId
    // Close modal
    this.activeModal.close('delete');
  }

  cancelDelete(): void {
    // Dismiss modal
    this.activeModal.dismiss();
  }

}

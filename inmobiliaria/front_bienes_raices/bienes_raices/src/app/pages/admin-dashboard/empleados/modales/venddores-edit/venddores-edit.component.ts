import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-venddores-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './venddores-edit.component.html',
  styleUrl: './venddores-edit.component.css'
})
export class VenddoresEditComponent {

 



  @Input() empleadoDetails: any = []
  @Output() closer = new EventEmitter<boolean>()


  ngOnInit() {
   

  }

 

  closeModal() {
    this.closer.emit(false)
  }


 
}

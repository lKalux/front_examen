import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from 'src/app/Interfaces/persona';
@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {
  constructor( 
    private dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPersona: Persona
    ) { 
  }

  ngOnInit(): void {
    
  }

  confirmarEliminar(){
    if(this.dataPersona){
      console.log(this.dataPersona);
      this.dialogRef.close("eliminar");
    }
  }
}

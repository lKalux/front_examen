import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Persona } from 'src/app/Interfaces/persona';
import { PersonaService } from 'src/app/Services/persona.service';
 
@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [ 
  ]
})
export class DialogAddEditComponent implements OnInit {

  personaForm: FormGroup;
  actionTitle: string = "Nueva Persona";
  actionBtn: string = "Guardar";
  constructor(
    private formBuilder: FormBuilder,
    private _personaService: PersonaService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPersona: Persona
    ) {
    this.personaForm = this.formBuilder.group({
      id: 0,
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required], 
      direccion: ['', Validators.required],
    }) 
  }

  mostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  addEditPersona(){
    console.log(this.personaForm.value);
    
    const modelo: Persona = {
      id: 0,
      nombre: this.personaForm.value.nombre,
      apellido: this.personaForm.value.apellido,
      edad: this.personaForm.value.edad, 
      direccion: this.personaForm.value.direccion
    }

    if(this.dataPersona == null){
      this._personaService.add(modelo).subscribe({
        next:(response)=>{
          this.mostrarAlerta("Persona agregada con exito", "Listo");
          this.dialogRef.close("creado");
        },
        error:(error)=>{
          this.mostrarAlerta("No se pudo crear", "Error");
          console.log(error); 
        }
      })
    }else{
      this._personaService.update(this.dataPersona.id,modelo).subscribe({
        next:(response)=>{
          this.mostrarAlerta("Persona Editada con exito", "Listo");
          this.dialogRef.close("editado");
        },
        error:(error)=>{
          this.mostrarAlerta("No se pudo editar", "Error");
          console.log(error); 
        }
      })
    }


  }

  ngOnInit(): void {
    if(this.dataPersona){
      this.actionTitle = "Editar Persona";
      this.actionBtn = "Actualizar";
      this.personaForm.patchValue({
        // id: this.dataPersona.id,
        nombre: this.dataPersona.nombre,
        apellido: this.dataPersona.apellido,
        edad: this.dataPersona.edad, 
        direccion: this.dataPersona.direccion
      });
    }
  }
}

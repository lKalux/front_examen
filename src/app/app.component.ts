import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Persona } from './Interfaces/persona';
import { PersonaService} from './Services/persona.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DialogDeleteComponent } from './Dialogs/dialog-delete/dialog-delete.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'examen-tecnico-frontend';
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Edad', 'Domicilio' , 'Acciones'];
  dataSource = new MatTableDataSource<Persona>;
  constructor(
    private _personaService: PersonaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){

  }

  ngOnInit(): void {
    this.mostrarPersonas();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarPersonas(){
    this._personaService.getPersonas().subscribe({
      next:(response)=>{
       console.log(response);
       this.dataSource.data = response
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  openModalNuevaPersona() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(result => {
      if(result == "creado"){
        this.mostrarPersonas();
      }
    });
  }

  openModalEditarPersona(persona: Persona) {
    this.dialog.open(DialogAddEditComponent, {
      disableClose:true,
      width:"350px",
      data: persona
    }).afterClosed().subscribe(result => {
      if(result == "editado"){
        this.mostrarPersonas();
      }
    });
  }

  openModalEliminarPersona(persona: Persona) {
    this.dialog.open(DialogDeleteComponent, {
      disableClose:true, 
      data: persona
    }).afterClosed().subscribe(result => {
      if(result == "eliminar"){
        this._personaService.delete(persona.id).subscribe({
          next:(response)=>{
            this.mostrarAlerta("Persona fue Eliminada ", "Listo");
            this.mostrarPersonas();
          },
          error:(error)=>{
            console.log(error);
          }
        })
      }
    });
  }

  mostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

}
 

import { Injectable } from '@angular/core';
import { Persona } from '../Interfaces/persona';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private endPoint:string = environment.apiUrl;
  private url:string = this.endPoint + 'persona';

  constructor(private http:HttpClient) { }

  getPersonas():Observable<Persona[]>{
    return this.http.get<Persona[]>(this.url);
  }

  add(persona:Persona):Observable<Persona>{
    return this.http.post<Persona>(this.url, persona);
  }

  update(id:number,persona:Persona):Observable<Persona>{
    return this.http.put<Persona>(`${this.url}/${id}`, persona);
  }

  delete(id:number):Observable<Persona>{
    return this.http.delete<Persona>(`${this.url}/${id}`);
  }
}

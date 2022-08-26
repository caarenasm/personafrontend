import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from './services/departamento/departamento.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  personaForm: FormGroup;
  paises: any;
  departamentos: any;
  persona: any;

  constructor(
    public fb: FormBuilder,
    public paisesService: PaisesService,
    public departamentoService: DepartamentoService,
    public personaService: PersonaService
  ) {

  }
  ngOnInit(): void {
    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      departamento: ['', Validators.required],
    });

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    },
      error => { console.error(error) }
    );

    this.personaService.getAllPersonas().subscribe(resp => {

    },
      error => { console.error(error) }
    );

    this.personaForm.get('pais')?.valueChanges.subscribe(value => {
      this.departamentoService.getAllDepartmentosByPais(value.id).subscribe(resp => {
        this.departamentos = resp;

      },
        error => { console.error(error) }
      );
    })
  }


  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset();
      this.persona=this.persona.filter((persona: { id: any; })=> resp.id!==persona.id);
      this.persona.push(resp);
    },
      error => { console.error(error) }
    )
  }

  eliminar(persona: { id: string; }){
    this.personaService.deletePersona(persona.id).subscribe(resp=> {
      if(resp===true){
        this.persona.pop(persona)
      }
    })
  }

  editar(persona: { id: any; nombre: any; apellido: any; edad: any; pais: any; departamento: any; }){
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      pais: persona.pais,
      departamento: persona.departamento,
    })
  }
}

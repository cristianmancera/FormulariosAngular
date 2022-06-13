import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: '',
    genero: ''
  }

  paisesA: any[] = [];
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(paises => {
      this.paisesA = paises;
      this.paisesA.unshift({
        nombre: '[Seleccione pais]',
        codigo: ''
      })
      // console.log(this.paisesA);

    });
  }
  guardar(forma: NgForm) {
    if (forma.invalid) {

      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }
  }

}

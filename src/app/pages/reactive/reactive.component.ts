import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {


  forma!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.cargarData();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
  }

  get correoNoValido() {
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  }

  get barrioNoValido() {
    return this.forma.get('direccion.barrio')?.invalid && this.forma.get('direccion.barrio')?.touched;
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched;
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get pass1NoValido() {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;
    return (pass1 === pass2) ? false : true;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required]],
      // apellido: ['', [Validators.required], this.validadores.noHerrera],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        barrio: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    })
  }


  crearListeners() {
    // this.forma.valueChanges.subscribe(valor => {
    //   console.log(valor);

    // })

    // this.forma.statusChanges.subscribe(statu => {
    //   console.log(statu);

    // })

    this.forma.get('nombre')?.valueChanges.subscribe(console.log);
  }

  cargarData() {
    this.forma.reset({
      nombre: "Crissss",
      apellido: "Am",
      correo: "a@gmail.com",
      direccion: {
        barrio: "asd",
        ciudad: "qwe"
      }
    })
  }
  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('Nuevo elemento', Validators.required))
  }
  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    if (this.forma.invalid) {

      return Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched())
        } else {

          control.markAsTouched();
        }

      });

      return;
    }

    this.forma.reset({
      apellido: 'asdads'
    });
  }

}

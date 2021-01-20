import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiCambioMonedaService } from 'src/app/service/api-cambio-moneda.service';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conversion-moneda',
  templateUrl: './conversion-moneda.component.html',
  styleUrls: ['./conversion-moneda.component.css'],
})
export class ConversionMonedaComponent implements OnInit {
  monedas: string[] = [];
  fechaActual: string;
  resultado: number = 0;
  valorCambio: number = 0;

  formConversion: FormGroup;

  constructor(
    private servCambioMoneda: ApiCambioMonedaService,
    private formBuilder: FormBuilder
  ) {
    //Se crea el formulario
    this.crearFormulario();

    //Se obtiene la fecha actual
    this.obtenerFechaActual();
    this.formConversion.get('fecha').setValue(this.fechaActual); //se coloca como defecto la fecha actual al formulario
  }

  ngOnInit(): void {
    //Se hace la consulta a la api de las monedas disponibles para la consulta de cambio
    this.servCambioMoneda.obtenerSelect().subscribe((res) => {
      //Se obtiene la lista de las monedas
      for (const property in res.rates) {
        this.monedas.push(property);
      }
      this.formConversion.get('moneda').setValue(this.monedas[0]); //se le coloca una moneda de cambio por defecto

      //consultar el valor de la moneda que va a aparecer por defecto
      this.actualizarResultado();
    });
  }

  crearFormulario() {
    this.formConversion = this.formBuilder.group({
      fecha: ['', [Validators.required]],
      Euros: [1, [Validators.required, Validators.min(1)]],
      moneda: ['', [Validators.required]],
    });

    this.formConversion
      .get('fecha')
      .valueChanges.pipe(
        debounceTime(500) //una espera para saber exactamente que digito el usuario
      )
      .subscribe((value) => {
        if (!this.compare(value, this.fechaActual)) {
          Swal.fire(
            'Error',
            'La fecha digitada debe ser no mayor a la fecha actual: ' +
              this.fechaActual,
            'error'
          );
          this.formConversion.get('fecha').setValue(this.fechaActual);
        } else {
          this.actualizarResultado();
        }
      });

    this.formConversion.get('moneda').valueChanges.subscribe((value) => {
      this.actualizarResultado();
    });

    this.formConversion.get('Euros').valueChanges.subscribe((value) => {
      this.actualizarResultado();
    });
  }

  get fecha() {
    return this.formConversion.get('fecha');
  }
  get Moneda() {
    return this.formConversion.get('moneda');
  }
  get Euros() {
    return this.formConversion.get('Euros');
  }

  obtenerFechaActual() {
    let f = new Date();
    this.fechaActual = moment(f).format('YYYY-MM-DD');
  }

  compare(dateTimeA, dateTimeB) {
    if (dateTimeA > dateTimeB) return false;
    else if (dateTimeA <= dateTimeB) return true;
    else return false;
  }

  actualizarResultado() {
    if (this.Euros.value > 0) {
      this.servCambioMoneda
        .consultarMoneda(this.fecha.value, this.Moneda.value)
        .subscribe(
          (res) => {
            //se obtiene el valor de la propiedad de la moneda por el cúal se va a hacer el cambio
            for (const property in res.rates) {
              this.valorCambio = res.rates[property];
            }
            //se obtiene el resultado del cambio
            this.resultado = this.Euros.value * this.valorCambio;
          },
          (e) => {
            this.resultado = 0;
          }
        );
    } else {
      this.resultado = 0;
    }
  }
}

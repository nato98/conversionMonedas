import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, ɵConsole } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { respuestaApi } from '../models/respuestaApi';

@Injectable({
  providedIn: 'root',
})
export class ApiCambioMonedaService {

  private base = environment.apiRoot;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  obtenerSelect(): Observable<respuestaApi> {

    return this.http.get<respuestaApi>(this.base+"latest");
  }

  consultarMoneda(fecha: string, symbols: string): Observable<any> {

    //parámetros
    let httpParams = new HttpParams()
    httpParams.set('base', 'EUR');
    httpParams.set('symbols', 'CAD');

    //console.log("ruta: "+this.base+fecha+"?base=EUR&symbols="+symbols)

    //return this.http.get<respuestaApi>(this.base+fecha, {params: httpParams});
    return this.http.get<any>(this.base+fecha+"?base=EUR&symbols="+symbols);
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversionMonedaComponent } from './component/conversion-moneda/conversion-moneda.component';

const routes: Routes = [
  { path: '', component: ConversionMonedaComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatFormFieldModule],
  exports: [MatCardModule, MatFormFieldModule],
})
export class MaterialModule {}

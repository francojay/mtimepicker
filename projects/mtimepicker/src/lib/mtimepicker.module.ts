import { NgModule } from '@angular/core';
import { MtimepickerComponent } from './mtimepicker.component';
import {
  MdInputModule,
  MdAutocompleteModule
} from './../../../../node_modules/@angular/material';

@NgModule({
  declarations: [MtimepickerComponent],
  imports: [MdInputModule, MdAutocompleteModule],
  exports: [MtimepickerComponent]
})
export class MtimepickerModule {}

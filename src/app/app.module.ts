import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MtimepickerModule } from './../../projects/mtimepicker/src/lib/mtimepicker.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MtimepickerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

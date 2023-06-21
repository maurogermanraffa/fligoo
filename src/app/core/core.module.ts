import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiBridgeService } from './services/api-bridge.service';


@NgModule({
  imports: [HttpClientModule,],
  providers: [ApiBridgeService],
})
export class CoreModule { }

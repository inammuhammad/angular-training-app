import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SideNavigationComponent } from './shared/modules/component/side-navigation/side-navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/modules/component/header/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './shared/services/interceptor.service';
import { LoadingBarModule } from '@ngx-loading-bar/core';
// import { LoginModule } from './modules/components/login/login.module';
// import { NumberPowerPipe } from './shared/pipes/number-power.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SideNavigationComponent,
    HeaderComponent,
    // NumberPowerPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    LoadingBarModule
    // LoginModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

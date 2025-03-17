import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { PlotsComponent } from './components/plots/plots.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table'; 
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FooterComponent } from './components/footer/footer.component';
import { ReportsComponent } from './components/reports/reports.component';
import { EdgeComponent } from './components/edge/edge.component'; 
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { BaseChartDirective } from 'ng2-charts';
// import { ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AdduserComponent } from './components/adduser/adduser.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { TicketsComponent } from './components/tickets/tickets.component';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule, NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Index1Component } from './components/index1/index1.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { RateusComponent } from './components/rateus/rateus.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MapsComponent } from './components/maps/maps.component';
import { VoiceAssistantComponent } from './components/voice-assistant/voice-assistant.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';



registerLocaleData(en);

export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PlotsComponent,
    SidenavComponent,
    TopnavComponent,
    FooterComponent,
    ReportsComponent,
    EdgeComponent,
    LoginComponent,
    DashboardComponent,
    AddLocationComponent,
    AddDeviceComponent,
    TicketsComponent,
    AdduserComponent,
    Index1Component,
    NotfoundComponent,
    RateusComponent,
    ChatbotComponent,
    MapsComponent,
    VoiceAssistantComponent,
    ParentComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,NzButtonModule,NzTableModule,NzTagModule,
    NzPageHeaderModule,NzDescriptionsModule,NzSpaceModule,NzBreadCrumbModule,NzModalModule,NzSelectModule,
    NzDatePickerModule,NgChartsModule,NzCardModule,NzSkeletonModule,NzAvatarModule,NzIconModule,
    NzGridModule,NzFormModule,NzInputModule,NzCheckboxModule,CommonModule,ReactiveFormsModule,NzStepsModule,
    NzPopconfirmModule,NzResultModule,NzRateModule,NgApexchartsModule,
    LottieModule.forRoot({ player: playerFactory }) 
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    NzMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

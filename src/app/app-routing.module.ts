import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { PlotsComponent } from './components/plots/plots.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReportsComponent } from './components/reports/reports.component';
import { EdgeComponent } from './components/edge/edge.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { Index1Component } from './components/index1/index1.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RateusComponent } from './components/rateus/rateus.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { MapsComponent } from './components/maps/maps.component';
import { VoiceAssistantComponent } from './components/voice-assistant/voice-assistant.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';

const routes: Routes = [
  {path: 'index', pathMatch: 'full', component: IndexComponent},
  {path: 'plots', pathMatch: 'full',component : PlotsComponent},
  {path: 'sidenav',pathMatch: 'full', component : SidenavComponent},
  {path: 'footer',pathMatch: 'full', component : FooterComponent},
  {path: 'reports',pathMatch: 'full', component : ReportsComponent},
  {path: 'edge',pathMatch: 'full', component : EdgeComponent},
  {path: '',pathMatch: 'full', component : LoginComponent},
  {path: 'dashboard',pathMatch: 'full', component : DashboardComponent},
  {path: 'adddevice', pathMatch: 'full',component : AddDeviceComponent},
  {path: 'addlocation',pathMatch: 'full', component : AddLocationComponent},
  {path: 'adduser',pathMatch: 'full', component : AdduserComponent},
  {path: 'tickets',pathMatch: 'full', component : TicketsComponent},
  {path: 'index1',pathMatch: 'full', component : Index1Component},
  {path: 'notfound',pathMatch: 'full', component : NotfoundComponent},
  {path: 'rateus',pathMatch: 'full', component : RateusComponent},
  {path: 'chatbot',pathMatch: 'full', component : ChatbotComponent},
  {path: 'maps',pathMatch: 'full', component : MapsComponent},
  {path: 'voice',pathMatch: 'full', component : VoiceAssistantComponent},
  {path: 'parent',pathMatch: 'full', component : ParentComponent},
  {path: 'child',pathMatch: 'full', component : ChildComponent},



  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }




];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  exports: [RouterModule]
})
export class AppRoutingModule { }

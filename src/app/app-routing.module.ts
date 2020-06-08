import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommandsComponent } from './commands/commands.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardAuthGuard } from './guards/dashboard-auth.guard';
import { XPCardComponent } from './xp-card/xp-card.component';
import { DocsComponent } from './docs/docs.component';
import { AddBotComponent } from './dashboard/add-bot/add-bot.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'docs/:page', component: DocsComponent },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardAuthGuard] },
  
  { path: 'dashboard/bots/add', component: AddBotComponent, canActivate: [DashboardAuthGuard] },
  { path: 'dashboard/bots/:id', component: XPCardComponent, canActivate: [DashboardAuthGuard] },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

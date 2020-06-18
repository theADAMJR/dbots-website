import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardAuthGuard } from './guards/dashboard-auth.guard';
import { DocsComponent } from './docs/docs.component';
import { AddBotComponent } from './dashboard/bots/add-bot/add-bot.component';
import { SearchWrapperComponent } from './bots/search-wrapper/search-wrapper.component';
import { BotAuthGuard } from './bot-auth.guard';
import { BotPageComponent } from './bot-page/bot-page.component';
import { BotComponent } from './dashboard/bots/bot/bot.component';
import { BotVoteComponent } from './bot-vote/bot-vote.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'docs/:page', component: DocsComponent },

  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  { path: 'search', component: SearchWrapperComponent },
  { path: 'tags/:tag', component: SearchWrapperComponent },

  { path: 'bots/:id', component: BotPageComponent },
  { path: 'bots/:id/vote', component: BotVoteComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardAuthGuard] },
  
  { path: 'dashboard/bots/new', component: AddBotComponent, canActivate: [DashboardAuthGuard] },
  { path: 'dashboard/bots/:id', component: BotComponent, canActivate: [BotAuthGuard] },
  { path: 'dashboard/bots/:id/edit', component: AddBotComponent, canActivate: [BotAuthGuard] },
  { path: 'dashboard/bots/:id/log', component: BotComponent, canActivate: [BotAuthGuard] },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

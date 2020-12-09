import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardAuthGuard } from './guards/dashboard-auth.guard';
import { AddBotComponent } from './dashboard/bots/add-bot/add-bot.component';
import { SearchWrapperComponent } from './bots/search-wrapper/search-wrapper.component';
import { BotAuthGuard } from './guards/bot-auth.guard';
import { BotPageComponent } from './bot-page/bot-page.component';
import { BotComponent } from './dashboard/bots/bot/bot.component';
import { BotVoteComponent } from './bot-vote/bot-vote.component';
import { LogoutComponent } from './logout/logout.component';
import { EditBotComponent } from './dashboard/bots/edit-bot/edit-bot.component';
import { LogModuleComponent } from './dashboard/log-module/log-module.component';
import { APIComponent } from './dashboard/api/api.component';
import { BotWidgetComponent } from './dashboard/bot-widget/bot-widget.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AnalyticsComponent } from './dashboard/bots/analytics/analytics.component';
import { PackComponent } from './packs/pack/pack.component';
import { PackVoteComponent } from './packs/pack-vote/pack-vote.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },

  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  { path: 'search', component: SearchWrapperComponent },
  { path: 'tags/:tag', component: SearchWrapperComponent },
  { path: 'tags', redirectTo: '/' },

  { path: 'packs/:id', component: PackComponent },
  { path: 'packs/:id/vote', component: PackVoteComponent },
  { path: 'packs', redirectTo: '/' },
  
  { path: 'bots/:id', component: BotPageComponent },
  { path: 'bots/:id/vote', component: BotVoteComponent },
  { path: 'bots', redirectTo: '/' },

  { path: 'users/:id', component: UserProfileComponent },
  { path: 'users', redirectTo: '/' },

  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardAuthGuard] },
  
  { path: 'dashboard/bots/new', component: AddBotComponent, canActivate: [DashboardAuthGuard] },
  { path: 'dashboard/bots/:id', component: BotComponent, canActivate: [BotAuthGuard] },
  { path: 'dashboard/bots/:id/analytics', component: AnalyticsComponent, canActivate: [BotAuthGuard] },
  { path: 'dashboard/bots/:id/api', component: APIComponent, canActivate: [BotAuthGuard] },
  { path: 'dashboard/bots/:id/edit', component: EditBotComponent, canActivate: [BotAuthGuard] },
  { path: 'dashboard/bots/:id/log', component: LogModuleComponent, canActivate: [BotAuthGuard] },
  { path: 'dashboard/bots/:id/widget', component: BotWidgetComponent, canActivate: [BotAuthGuard] },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

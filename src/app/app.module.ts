import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowOnDirtyErrorStateMatcher, ErrorStateMatcher } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { InviteComponent } from './invite/invite.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HomeComponent } from './home/home.component';
import { LogModuleComponent } from './dashboard/log-module/log-module.component';
import { BotSidebarComponent } from './dashboard/bots/bot-sidebar/bot-sidebar.component';
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { MaterialModule } from './material-module';
import { SaveChangesComponent } from './dashboard/save-changes/save-changes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CleanDateTimePipe } from './pipes/clean-date-time.pipe';
import { MemberUsernameComponent } from './member-username/member-username.component';
import { ZippyComponent } from './zippy/zippy.component';
import { AuditLogWidgetComponent } from './dashboard/widgets/audit-log-widget/audit-log-widget.component';
import { TruncatedPipe } from './pipes/truncated.pipe';
import { DurationStringPipe } from './pipes/duration-string.pipe';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { WavesComponent } from './waves/waves.component';
import { AddBotComponent } from './dashboard/bots/add-bot/add-bot.component';
import { BotPreviewComponent } from './bot-preview/bot-preview.component';
import { BotCardComponent } from './bot-card/bot-card.component';
import { SEOService } from './services/seo.service';
import { BotsComponent } from './bots/bots.component';
import { SearchWrapperComponent } from './bots/search-wrapper/search-wrapper.component';
import { EditBotComponent } from './dashboard/bots/edit-bot/edit-bot.component';
import { RocketButtonComponent } from './rocket-button/rocket-button.component';
import { KebabToTitleCasePipe } from './pipes/kebab-to-sentence-case.pipe';
import { MiniDatePipe } from './pipes/mini-date.pipe';
import { BotPageComponent } from './bot-page/bot-page.component';
import { environment } from 'src/environments/environment';
import { BotComponent } from './dashboard/bots/bot/bot.component';
import { BotVoteComponent } from './bot-vote/bot-vote.component';
import { BotLogComponent } from './dashboard/bot-log/bot-log.component';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { APIComponent } from './dashboard/api/api.component';
import { VotesWidgetComponent } from './dashboard/widgets/votes-widget/votes-widget.component';
import { BotWidgetComponent } from './dashboard/bot-widget/bot-widget.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { SearchComponent } from './search/search.component';
import { PacksComponent } from './packs/packs.component';
import { PackCardComponent } from './packs/pack-card/pack-card.component';
import { AnalyticsComponent } from './dashboard/bots/analytics/analytics.component';
import { PackComponent } from './packs/pack/pack.component';
import { PackVoteComponent } from './packs/pack-vote/pack-vote.component';
import { GraphComponent } from './dashboard/analytics/graph/graph.component';

@Injectable()
export class AlertErrorHandler implements ErrorHandler {
  async handleError(error: Error | any) {
    try {
      console.log(error);

      const message = error?.error?.message
        ?? error?.rejection?.error?.message
        ?? error?.rejection?.error
        ?? error?.message
        ?? error;
      console.log(message);

      const key = localStorage.getItem('key');
      await fetch(`${environment.endpoint}/error`, {
        method: 'POST',
        headers: {
          'Authorization': key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
    } catch {}
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    InviteComponent,
    LogoutComponent,
    DashboardComponent,
    SidebarComponent,
    SpinnerComponent,
    LogModuleComponent,
    BotSidebarComponent,
    DashboardSidebarComponent,
    SaveChangesComponent,
    NotFoundComponent,
    CleanDateTimePipe,
    MemberUsernameComponent,
    ZippyComponent,
    AuditLogWidgetComponent,
    TruncatedPipe,
    DurationStringPipe,
    HomeFooterComponent,
    WavesComponent,
    AddBotComponent,
    BotPreviewComponent,
    BotCardComponent,
    BotsComponent,
    SearchWrapperComponent,
    EditBotComponent,
    RocketButtonComponent,
    KebabToTitleCasePipe,
    MiniDatePipe,
    BotPageComponent,
    BotComponent,
    BotVoteComponent,
    BotLogComponent,
    CookieBannerComponent,
    APIComponent,
    VotesWidgetComponent,
    BotWidgetComponent,
    UserProfileComponent,
    SearchComponent,
    PacksComponent,
    PackCardComponent,
    AnalyticsComponent,
    PackComponent,
    PackVoteComponent,
    GraphComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SocketIoModule.forRoot({ url: environment.rootEndpoint }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    HighlightModule,
    ChartsModule
  ],
  providers: [
    SEOService,
    { provide: ErrorHandler, useClass: AlertErrorHandler },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: { languages: getHighlightLanguages() }
    }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}

export function getHighlightLanguages() {
  return {
    json: () => import('highlight.js/lib/languages/json')
  };
}

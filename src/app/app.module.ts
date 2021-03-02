import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DevPostPageComponent } from './pages/dev-post-page/dev-post-page.component';
import { SectionPageComponent } from './pages/section-page/section-page.component';
import { VaultComponent } from './pages/vault/vault.component';
import { AboutComponent } from './pages/about/about.component';
import { TagPageComponent } from './pages/tag-page/tag-page.component';
import { GraphQLModule } from './graphql.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PostPageComponent,
    HomePageComponent,
    DevPostPageComponent,
    SectionPageComponent,
    VaultComponent,
    AboutComponent,
    TagPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, GraphQLModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

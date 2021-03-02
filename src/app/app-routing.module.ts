import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { DevPostPageComponent } from './pages/dev-post-page/dev-post-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { SectionPageComponent } from './pages/section-page/section-page.component';
import { TagPageComponent } from './pages/tag-page/tag-page.component';
import { VaultComponent } from './pages/vault/vault.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'writing/:slug',
    component: PostPageComponent,
  },
  {
    path: 'dev/:slug',
    component: DevPostPageComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: 'vault', component: VaultComponent, pathMatch: 'full' },
  { path: 'tag/:tag', component: TagPageComponent, pathMatch: 'full' },
  {
    path: 'section/:section',
    component: SectionPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

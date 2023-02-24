import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '/',
    redirectTo: 'to-do-list',
    pathMatch:'full',
    children: [
      {
        path: 'to-do-list',
        title: 'To-Do List',
        component: AppComponent,
        loadChildren: () => import('./app.module').then(module => module.AppModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

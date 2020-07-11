import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth.interceptor.service';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    data: { preload: true, delay: true }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { preload: true, delay: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'Students',
    loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule),
    data: { preload: true, delay: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'Teachers',
    loadChildren: () => import('./modules/teachers/teachers.module').then(m => m.TeachersModule),
    data: { preload: true, delay: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'MyCalenders',
    loadChildren: () => import('./modules/mycalenders/my-calenders.module').then(m => m.MyCalendersModule),
    data: { preload: true, delay: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'ClassRooms',
    loadChildren: () => import('./modules/classrooms/classrooms.module').then(m => m.ClassRoomsModule),
    data: { preload: true, delay: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'Classes',
    loadChildren: () => import('./modules/classes/classes.module').then(m => m.ClassesModule),
    data: { preload: true, delay: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'CenterAdmins',
    loadChildren: () => import('./modules/centeradmins/center-admins.module').then(m => m.CenterAdminsModule),
    data: { preload: true, delay: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'Calenders',
    loadChildren: () => import('./modules/calenders/calenders.module').then(m => m.CalendersModule),
    data: { preload: true, delay: true },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule { }

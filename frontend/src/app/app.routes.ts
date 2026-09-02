import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';
import { authGuard } from './guards/auth-guard';
import { Upload } from './pages/upload/upload';
import { Images } from './pages/images/images';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard]
  },
  {
  path: 'upload',
  component: Upload,
  canActivate: [authGuard]
},
{
  path: 'images',
  component: Images,
  canActivate: [authGuard]
}

];
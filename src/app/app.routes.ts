import { Routes } from '@angular/router';
import { routes as userRoutes } from './users/users.routes';
import { TasksComponent } from './tasks/tasks.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

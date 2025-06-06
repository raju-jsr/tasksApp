import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { routes as userRoutes } from './users/users.routes';
import { TasksComponent } from './tasks/tasks.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAcess = Math.random();
  if (shouldGetAcess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Task Selected ',
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'YOHOHOHOHO',
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

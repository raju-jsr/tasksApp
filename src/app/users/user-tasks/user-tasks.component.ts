import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';
import { NewTaskComponent } from '../../tasks/new-task/new-task.component';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  message = input<string>();
  userName = input.required<string>();
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // userName = computed(
  //   () => this.userService.users.find((u) => u.id === this.userId())?.name
  // );

  ngOnInit() {
    console.log(this.activatedRoute);
    console.log(this.message());
    console.log(this.userName());

    // this.activatedRoute.data.subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    // });

    // const subsription = this.activatedRoute.paramMap.subscribe({
    //   next: (paramMap) => {
    //     this.userName =
    //       this.userService.users.find((u) => u.id === paramMap.get('userId'))
    //         ?.name || '';
    //   },
    // });

    // this.destroyRef.onDestroy(() => subsription.unsubscribe());
  }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};

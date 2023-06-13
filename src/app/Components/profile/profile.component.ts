import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ProfileModel } from 'src/app/Models/ProfileModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: ProfileModel | undefined;
  errorMessage: string | undefined;

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.getUserWithBookings();
  }

  getUserWithBookings(): void {
    this.userService.getUserWithBookings()
      .subscribe(
        (profile: ProfileModel) => {
          this.profile = profile;
        },
        (error: any) => {
          this.errorMessage = error?.error?.message || 'An error occurred while fetching user details.';
        }
      );
  }
  

}

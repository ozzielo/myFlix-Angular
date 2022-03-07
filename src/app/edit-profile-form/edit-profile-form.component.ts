import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
})
export class EditProfileFormComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = JSON.parse(localStorage.getItem('user') || '');

  /**
   *  Binding input values to userProfile object
   */
  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }


  editUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    console.log(this.userData, "111")
    this.fetchApiData
      .editUserProfile(this.userData)
      .subscribe((resp) => {
        console.log(this.userData, "222")

        this.dialogRef.close();

        localStorage.setItem('user', JSON.stringify(resp));

        this.snackBar.open('Your profile was updated successfully!', 'OK', {
          duration: 4000,
        });
        setTimeout(() => {
          window.location.reload();
        });
      });
  }

  getUserInfo(): void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    if (user) {
      this.fetchApiData.getUserProfile(user.Username).subscribe((res: any) => {
        this.user = res;

        console.log(this.user);
      });
    }
  }
}
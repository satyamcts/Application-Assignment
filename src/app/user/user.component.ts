import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  userList: any = [];
  filterData!: string;
  selectedUser: any | null = null;
  userForm !: FormGroup;
  constructor(private usergeting: UserService, private fb: FormBuilder, public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userList = this.usergeting.getUser();
  }

  filterUser() {
    this.userList = this.usergeting.searchUsers(this.filterData);
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
    this.userForm = this.fb.group({
      email: [this.selectedUser.email, [Validators.required, Validators.email]],
      phone: [
        this.selectedUser.phone,
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      id: [this.selectedUser.id],
      username: [this.selectedUser.username],
    });
    $('#userEditModel').modal('show');
  }

  deleteUser(id: number, username: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        name: username,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usergeting.deleteUser(id);
        this.actionDataLoad();
      } else {
        console.log('Data deletion canceled.');
      }
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      this.usergeting.updateUser(this.userForm.value);
      this.closeModal();
      this.selectedUser = null;
      this.actionDataLoad();
    }
  }

  actionDataLoad() {
    this.loadData(); // load user list after deliting data or user
    this.filterUser(); // if applied filterUser and delete data this will prevent to load init data (apply filter)
  }

  closeModal() {
    $('#userEditModel').modal('hide');
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

    private users = [
      {
        id: 1,
        username: 'Rajmohan',
        phone: 9888888888,
        email: 'rajmohan@cts.com',
      },
      {
        id: 2,
        username: 'Raj',
        phone: 8888888888,
        email: 'raj@cts.com',
      },
      {
        id: 3,
        username: 'Raju',
        phone: 7777777777,
        email: 'raj@cts.com',
      },
      {
        id: 4,
        username: 'Satyam',
        phone: 4535435345,
        email: 'satyam@cts.com',
      },
      {
        id: 5,
        username: 'Sonu',
        phone: 53453534543,
        email: 'sonu@cts.com',
      },
      {
        id: 6,
        username: 'Rajkumar',
        phone: 4346534567,
        email: 'rajkumar@cts.com',
      },
      {
        id: 7,
        username: 'Rajesh',
        phone: 4234567856,
        email: 'rajesh@cts.com',
      },
    ];
  
    getUser() {
      return this.users;
    }
  
    searchUsers(query: string) {
      return this.users.filter((user) =>
        user.username.toLowerCase().includes(query.toLocaleLowerCase())
      );
    }
  
    updateUser(user: any) {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
      }
    }
  
    deleteUser(id: number) {
      this.users = this.users.filter((user) => user.id !== id);
    }
  
}

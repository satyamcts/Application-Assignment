import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users on search', () => {
    const results = service.searchUsers('Raj');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should update a user', () => {
    const user = { id: 1, username: 'Rajmohan', phone: 1111111111, email: 'rajmohan@example.com' };
    service.updateUser(user);
    const updatedUser = service.getUser().find(u => u.id === user.id);
    expect(updatedUser?.phone).toBe(1111111111);
  });

  it('should delete a user', () => {
    service.deleteUser(1);
    const user = service.getUser().find(u => u.id === 1);
    expect(user).toBeUndefined();
  });
});

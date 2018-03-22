const expect = require('expect');
const {Users} = require('./users.js');


describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id:1,
      name: 'Mike',
      room: 'Node Course'
    }, {
      id:2,
      name: 'Jen',
      room: 'React Course'
    },{
      id:3,
      name: 'Julie',
      room: 'Node Course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Ben',
      room: 'The Office Fans'
    }

    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users[0]).toEqual(user);
  });

  it('should remove user', () => {
    var id = 1;
    var res = users.removeUser(id);
    expect(res[0].id).not.toEqual(1);
  });

  it('should not remove user', () => {
    //pass in ID that does not exist
    var id = 5;
    var res = users.removeUser(id);
    expect(res).toBeFalsy();
  });

  it('should get user', () => {
    var id = 1;
    var res = users.getUser(id);
    expect(res.id).toEqual(id);
  });

  it('should not find user', () => {
    var id = 5;
    var res = users.getUser(id);
    expect(res).toBeFalsy();
  });

  it('should return names for Node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for React course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);
  });
});

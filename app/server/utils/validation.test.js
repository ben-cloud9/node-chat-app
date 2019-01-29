const expect = require('expect');

const {isRealString} = require('./validation.js')
//import isRealString

// isRealString
describe('isRealString', () => {
  //should reject non string values
  it('should reject non string values', () => {
    var res = isRealString(123);
    expect(res).toBe(false);
  });
  //should reject strings with only spaces
  it('should reject strings with only spaces', () => {
    var res = isRealString('     ');
    expect(res).toBe(false);
  });
  //should return true for valid input
  it('should return true for valid input', () => {
    var res = isRealString('test');
    expect(res).toBe(true);
  });
});

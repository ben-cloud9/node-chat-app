const expect = require('expect');

const {generateMessage} = require('./message.js');
describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Ben';
    var text = 'Hi!';
    var res = generateMessage(from, text);

    //assert from match
    expect(res.from).toBe(from);
    //assert text match
    expect(res.text).toBe(text);
    //assert createdAt //typeof toBe
    expect(typeof res.createdAt).toBe('number');
  });
});

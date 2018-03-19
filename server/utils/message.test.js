const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message.js');
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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Ben';
    var latitude = 1;
    var longitude = 2;

    var res = generateLocationMessage(from, latitude, longitude);

    expect(res.from).toBe(from);

    expect(res.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
  });

});

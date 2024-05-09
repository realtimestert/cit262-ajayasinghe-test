const helloworld = require('../src/helloworld');

test('prints correct greeting with first name', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  helloworld();
  expect(consoleSpy).toHaveBeenCalledWith('Hello Andrew Jayasinghe');
});
const api = require('../api');

jest.mock('aws-sdk', () => {
  const mockDocumentClient = {
    put: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };

  const mockConfig = {
    update: jest.fn(),
  };

  const mockDynamoDB = {
    DocumentClient: jest.fn(() => mockDocumentClient),
    // You can mock other DynamoDB methods as needed
    // For example:
    // putItem: jest.fn().mockImplementation((params, callback) => {}),
    // getItem: jest.fn().mockImplementation((params, callback) => {}),
    // listTables: jest.fn().mockImplementation((params, callback) => {}),
  };

  return {
    DynamoDB: mockDynamoDB,
    config: mockConfig,
  };
});

describe('API Tests', () => {
  it('should test the DynamoDB interaction', async () => {
    const event = { id: 1, name: 'Test Event' };
    AWS.DynamoDB.DocumentClient.prototype.put().promise.mockResolvedValue({});
    await api.createEvent(event);
    expect(AWS.DynamoDB.DocumentClient.prototype.put).toHaveBeenCalledWith({
      TableName: 'event',
      Item: event,
    });
  });
});
const helloworld = require('../src/helloworld');

test('prints correct greeting with first name', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  helloworld();
  expect(consoleSpy).toHaveBeenCalledWith('Hello Andrew Jayasinghe');
});

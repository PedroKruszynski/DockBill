import CreateTokenService from './CreateTokenService';

describe('Authenticate', () => {
  it('should be able to authenticate a user', async () => {
    const authenticate = new CreateTokenService();

    const response = await authenticate.execute();

    expect(response).toHaveProperty('token');
  });
});

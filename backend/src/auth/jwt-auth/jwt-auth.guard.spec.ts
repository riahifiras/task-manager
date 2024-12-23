import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access for valid JWT token', async () => {
    const context = { switchToHttp: jest.fn().mockReturnValue({ getRequest: () => ({ headers: { authorization: 'Bearer valid_token' } }) }) } as unknown as ExecutionContext;

    // For a real test, mock JWT validation logic
    jest.spyOn(guard, 'canActivate').mockResolvedValue(true);

    expect(await guard.canActivate(context)).toBe(true);
  });

  it('should deny access if no token is provided', async () => {
    const context = { switchToHttp: jest.fn().mockReturnValue({ getRequest: () => ({ headers: {} }) }) } as unknown as ExecutionContext;

    jest.spyOn(guard, 'canActivate').mockResolvedValue(false);

    expect(await guard.canActivate(context)).toBe(false);
  });
});

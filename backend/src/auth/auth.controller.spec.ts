import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signup: jest.fn(),
    login: jest.fn(),
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        JwtService, // Mock JwtService if needed in the future
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should return a JWT token when signup is successful', async () => {
      const result = { access_token: 'test-token' };
      const createUserDto: CreateUserDto = { username: 'user', password: 'password123' };
      mockAuthService.signup.mockResolvedValue(result);

      expect(await authController.signup(createUserDto)).toBe(result);
    });

    it('should throw an error if the user already exists', async () => {
      const createUserDto: CreateUserDto = { username: 'user', password: 'password123' };
      mockAuthService.signup.mockRejectedValue(new Error('Username already taken'));

      await expect(authController.signup(createUserDto)).rejects.toThrow('Username already taken');
    });
  });

  describe('login', () => {
    it('should return a JWT token when login is successful', async () => {
      const result = { access_token: 'test-token' };
      const loginDto: LoginDto = { username: 'user', password: 'password123' };
      mockAuthService.validateUser.mockResolvedValue(true);
      mockAuthService.login.mockResolvedValue(result);

      expect(await authController.login(loginDto)).toBe(result);
    });

    it('should throw an error when invalid credentials are provided', async () => {
      const loginDto: LoginDto = { username: 'user', password: 'wrongpassword' };
      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(authController.login(loginDto)).rejects.toThrow('Invalid credentials');
    });
  });
});

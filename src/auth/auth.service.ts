import { BadRequestException, Injectable } from '@nestjs/common';
import { Account, Client, Models } from 'appwrite';
import { User } from 'src/users/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RescuePassAuthDto } from './dto/rescue-pass.dto';
import { ChangePassAuthDto } from './dto/change-pass.dto';

@Injectable()
export class AuthService {
    private client: Client;
    // private users: Users;
    private account: Account;
  
    constructor(private configService: ConfigService) {
      this.client = new Client()
        .setEndpoint(this.configService.get<string>('APPWRITE_ENDPOINT')) 
        .setProject(this.configService.get<string>('APPWRITE_PROJECT'))
        // .setKey(this.configService.get<string>('APPWRITE_API_KEY'));

        this.account = new Account(this.client);
    }
  
    getClient(): Client {
      return this.client;
    }

    async signup(createAuthDto: CreateAuthDto): Promise<User>{
      const { email, password, name } = createAuthDto;

      try {

        const response = await this.account.create(
          "unique()", // Generates a unique user ID
          email,
          password,
          name
        );

        const user: User = {
          id: response.$id,
          email: response.email,
          name: response.name
        }
  
        return user;
      } catch (error) {
        throw new BadRequestException(error.response);
      }
      
    }

    async login(loginAuthDto: LoginAuthDto): Promise<Models.Session>{
      const {email, password } = loginAuthDto;

      try {
        const response = this.account.createEmailPasswordSession(
          email,
          password
        );

        return response;
      } catch (error) {
        throw new BadRequestException(error.response);
      }
    }

    async rescuepass(rescueAuth: RescuePassAuthDto): Promise<Models.Token>{
      const {email} = rescueAuth;

      try {
        const response = this.account.createRecovery(
          email,
          'https://localhost:3000'
        );

        return response;
      } catch (error) {
        throw new BadRequestException(error.response);
      }
    }

    async changepass(changepassAuth: ChangePassAuthDto ): Promise <Models.Token>{
      try {
        const { user_id, secret, password} = changepassAuth;

        const response = this.account.updateRecovery(
          user_id,
          secret,
          password
        );

        return response;
      } catch (error) {
        throw new BadRequestException(error.response);
      }
    }
}

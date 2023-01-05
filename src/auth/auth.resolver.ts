import { Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation( () => Int , { name: 'signup', description: 'Create new user, sing in on system.' } )
  async signIn()/** Promise<User> */{
    // return this.authService.signUp();
  }

  @Mutation( () => Int , { name: 'login', description: 'Log in in system, authenticate user.' } )
  async logIn()/** Promise<User> */{
    // return this.authService.logIn();
  }

  @Query(/** () => ?? , {name: 'revalidateToken'} */)
  revalidateToken(){
    // return this.authService.revalidateToken();
  }

}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [],
  providers: [AuthResolver, AuthService],
  exports: []
})
export class AuthModule {}

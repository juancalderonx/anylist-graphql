import { join } from 'path';
import { Request } from 'express';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { LoggerModule } from 'nestjs-pino';

import { EnvConfiguration } from './config/env.config';
import { ItemsModule } from './items/items.module';
import { CorrelationIdMiddleware, CORRELATION_ID_HEADER } from './common/middlewares/correlation-id.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault()
      ]
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // El + es porque debe ser un número.
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            messageKey: 'message'
          }
        },
        messageKey: 'message',
        customProps: (req: Request) => { // Request from Express
          return {
            correlationId: req[CORRELATION_ID_HEADER],
          };
        },
        autoLogging: false,
        serializers: {
          req: () => { return undefined; },
          res: () => { return undefined; }
        }
      }
    }),

    ItemsModule,

    UsersModule,


  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}

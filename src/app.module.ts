import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { CityEntity } from './city/entities/city.entity';
import { StateEntity } from './state/entities/state.entity';
import { AddressEntity } from './address/entities/address.entity';

import { CacheModule } from './cache/cache.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CategoryEntity } from './category/entities/category.entity';
import { ProductEntity } from './product/entities/product.entity';

export const entities = [
  UserEntity,
  CityEntity,
  StateEntity,
  AddressEntity,
  CategoryEntity,
  ProductEntity,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: entities,
      migrations: [`${__dirname}/migrations/*.{js,ts}`],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    CacheModule,
    AddressModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

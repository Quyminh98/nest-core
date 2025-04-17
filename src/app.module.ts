import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.module';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { Artist } from './artists/artist.entity';
import { User } from './users/users.entity';
import { Playlist } from './playlists/playlist.entity';
import { PlayListModule } from './playlists/playlists.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { dataSourceOptions, typeOrmAsyncConfig } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from 'env.validation';
// {
//   type: 'postgres',
//   database: 'spotify-clone-02',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'Qt291298',
//   entities: [Song, User, Artist, Playlist],
//   synchronize: true,
// }
@Module({
  imports: [
    // TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedModule,
    // ConfigModule.forRoot({
    //   envFilePath: ['.env.development', '.env.production'],
    //   isGlobal: true,
    //   load: [configuration],
    //   validate: validate,
    // }),
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      load: [configuration],
      validate: validate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   constructor(private dataSource: DataSource) {
//     console.log(dataSource.driver.database);
//   }
//   configure(consumer: MiddlewareConsumer) {
//     // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
//     // consumer
//     // .apply(LoggerMiddleware)
//     // .forRoutes({ path:  'songs',  method:  RequestMethod.POST }); //option no 2
//     consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
//   }
// }
export class AppModule {}

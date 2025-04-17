import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Jane',
    description: 'Provide the first name of the user',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'provide the lastName of the user',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'jane_doe@gmail.com',
    description: 'Provide the email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'test123#@',
    description: 'Provide the password of the user',
  })
  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];

  // store the secret key for each user
  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  // enable or disable the two-factor authentication
  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Column()
  apiKey: string;
}

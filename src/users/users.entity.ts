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

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

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

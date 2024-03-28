import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UsersModule } from './user.module';
import { positionXY } from 'src/entity/positionXY.entity';
import { raw } from 'src/entity/raw.entity';
import { rawModule } from './raw.module';
import { positionXYModule } from './positionXY.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {           
        type:'mysql',
        host:'',
        port:,
        username:'',
        password:'',
        database:'',    
        entities:[],    
        synchronize:false,       
      }      
      ),
      UsersModule,
      rawModule,
      positionXYModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

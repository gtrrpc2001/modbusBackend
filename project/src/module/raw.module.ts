import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rawController } from 'src/controller/raw.controller';
import { raw } from 'src/entity/raw.entity';
import { rawService } from 'src/service/raw.service';



@Module({

imports:[TypeOrmModule.forFeature([raw])],
controllers:[rawController],
providers:[rawService]

})
export class rawModule {}
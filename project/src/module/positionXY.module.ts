import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { positionXYController } from 'src/controller/positionXY.controller';
import { positionXY } from 'src/entity/positionXY.entity';
import { positionXYService } from 'src/service/positionXY.service';




@Module({

imports:[TypeOrmModule.forFeature([positionXY])],
controllers:[positionXYController],
providers:[positionXYService]

})
export class positionXYModule {}
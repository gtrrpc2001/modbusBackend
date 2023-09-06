import { Body,Controller, Get,Param,Patch, Post,Query ,Logger} from '@nestjs/common';
import { positionXYService } from 'src/service/positionXY.service';
import { ApiTags } from '@nestjs/swagger';
import { BodyDto } from 'src/dto/positionXYDTO';
import { positionXY } from 'src/entity/positionXY.entity';
import { InsertResult, UpdateResult } from 'typeorm';


@Controller('positionXYs')
@ApiTags('PositionXY')
export class positionXYController {
  constructor(private readonly positionXYService: positionXYService) {}
  private readonly logger = new Logger(positionXYController.name);  

  @Get("/xy")
  getPositionXY(@Query('groupName') groupName: string): Promise<positionXY[]>{  
    return this.positionXYService.getPosition(groupName);
  }

  @Patch("/:groupName/:tag/:addr")
  getUpdateXY(
  @Param('groupName') groupName: string, 
  @Param('tag') tag: string ,
  @Param('addr') addr: string,
  @Body() body: BodyDto): Promise<UpdateResult>{
        console.log(groupName);
        return this.positionXYService.updatePosition(groupName,tag,addr,body);
  }

  @Post("/insert")
  getInsertXY(  
  @Body() body: BodyDto): Promise<InsertResult>{    
    console.log(body)
        return this.positionXYService.insertPosition(body);
  } 
}
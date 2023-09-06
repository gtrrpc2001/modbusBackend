import { Controller, Get,Query ,Logger} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { raw } from 'src/entity/raw.entity';
import { rawService } from 'src/service/raw.service';



@Controller('raws')
@ApiTags('Raw')
export class rawController {
  constructor(private readonly rawService: rawService) {}
  private readonly logger = new Logger(rawController.name);

  @Get("/")
  getRawAll(): Promise<raw[]>{
      return this.rawService.getRawAll();
  }

  @Get("/One")
  getRawOne(
    @Query('tag') tag: string
    ): Promise<raw[]>{  
    return this.rawService.getOne(tag);
  }

  @Get("/graph")
  getRawData(
    @Query('tag') tag: string,
    @Query('datatime') datatime: string
  ): Promise<raw[]>{  
    return this.rawService.getRawData(tag,datatime);
  }  
}
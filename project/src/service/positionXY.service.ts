import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository,UpdateResult } from 'typeorm';
import * as fs from 'fs';
import { positionXY } from 'src/entity/positionXY.entity';
import { BodyDto } from 'src/dto/positionXYDTO';

@Injectable()
export class positionXYService { 
  private position: positionXY[] = [];
  constructor(@InjectRepository(positionXY) private positionXYRepository: Repository<positionXY>){}   

  async getPosition(groupName: string) : Promise<positionXY[]>{        
    var result : positionXY[] = await this.positionXYRepository.createQueryBuilder('positionXY')
    .select('idx,groupName, tag,addr,x,y')
    .where({"groupName": groupName})  
    .orderBy('addr',"ASC")
    .getRawMany()    
    return result;
  }
  
  async updatePosition(groupName: string,tag: string,addr: string,body: BodyDto) : Promise<UpdateResult>{        
    const result  = await this.positionXYRepository.createQueryBuilder('positionXY')
    .update(positionXY)
    .set({"x": body.updateX,"y":body.updateY})
    .where({"groupName": groupName}).andWhere({"tag": tag}).andWhere({"addr":addr})    
    .execute()
    console.log(groupName)
    return result;
  }

  async insertPosition(body: BodyDto) : Promise<InsertResult>{        
    const result  = await this.positionXYRepository.createQueryBuilder('positionXY')
    .insert()
    .into(positionXY)
    .values([
      {groupName:body.groupName,tag: body.tag, addr: body.addr,x: body.updateX,y:body.updateY}
    ])
    .execute()    
    return result;
  }



  WriteJsonData(result: any){          
    const tag_listJson = JSON.stringify(result)    
    fs.writeFileSync('C:/flutterProject/modbusUI/assets/jsonFile/raw-json.json',tag_listJson);
    
  }
}

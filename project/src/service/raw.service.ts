import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';

import * as fs from 'fs';
import { raw } from 'src/entity/raw.entity';


@Injectable()
export class rawService { 
  private raws: raw[] = [];
  constructor(@InjectRepository(raw) private rawRepository: Repository<raw>){}  

  async getRawAll(): Promise<raw[]> {    
    const result = await this.rawRepository.find();
    return result;
  } 

  async getRawData(tag: string, datatime: string) : Promise<raw[]>{        
    const groupby = "DATE_FORMAT(datatime,'%H')"
var result : raw[] = await this.rawRepository.createQueryBuilder('raw')
.select('idx,eq, tag, datatime,value,ext,kind,avg(VALUE) as avg_value')
.where({"tag": tag}).andWhere({"datatime": MoreThanOrEqual(datatime)})
.groupBy(groupby)
.orderBy("datatime","ASC")
.getRawMany()
return result;
}

  async getOne(tag: string) : Promise<raw[]>{
        const today = new Date
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        var monthStr: string = month.toString()
        if (month < 10){
          monthStr = "0" + month.toString()
        }
        const date = today.getDate()    
        var dateStr: string = date.toString()
        if (date < 10){
          dateStr = "0" + date.toString()
        }    
        const datatime = year + "-" + monthStr + "-" + dateStr 
        //console.log(datatime)
        const groupby = "DATE_FORMAT(datatime,'%H')"
    var result : raw[] = await this.rawRepository.createQueryBuilder('raw')
    .select('idx,eq, tag, datatime,value,ext,kind,avg(VALUE) as avg_value')
    .where({"tag": tag}).andWhere({"datatime": MoreThanOrEqual(datatime)})
    .groupBy(groupby)
    .orderBy('idx',"ASC")
    .getRawMany()    
    return result;
  }
  

  WriteJsonData(result: any){          
    const tag_listJson = JSON.stringify(result)    
    fs.writeFileSync('C:/flutterProject/modbusUI/assets/jsonFile/raw-json.json',tag_listJson);    
  }
}
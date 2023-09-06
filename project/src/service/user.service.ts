import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class UserService {
  users: User[] = [];
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}  
  
  async getUsers(user: User): Promise<User[]>{
    return await this.userRepository.find();
  }

  async getUser(tag: string): Promise<User>{
    console.log(tag);
    const user = await this.userRepository.find(
      {
       select:["설비", "태그", "addr","comment","value","datatime","vmin","vmax",
        "vsum","vcnt","vavg","scale","offset","alarm_hh","alarm_h","alarm_l",
      "alarm_ll","alarm_result","설명","단위","UnitID","Host","Port",
       "CommSetting","CommTimeOutSec","SaveMode","SaveInterval"],
       where: [{"태그": tag}]
      }
    )
    console.log(user.length);
      return user[0];
  }    

  async updateUser(tag: string, updateData: any){
    const user = this.getOne(tag);
    this.deleteUser(tag);
    this.users.push({...user,...updateData});
  }

  async getAll(): Promise<User[]> {    
    var result : User[] = await this.userRepository.createQueryBuilder('User')
    .select('idx,사용, 설비,그룹, 태그,addr, comment, value, datatime, vmin, vmax, vsum, vcnt, vavg, scale, offset, alarm_hh, alarm_h, alarm_l, alarm_ll, alarm_result, 설명, 단위, UnitID, Host, Port, CommSetting, CommTimeOutSec, SaveMode, SaveInterval')    
    .orderBy('addr',"ASC")
    .getRawMany()    
    return result;    
  } 

  async  All(): Promise<User[]> {
    const result = await this.userRepository.find();   
    return result
  } 

  async getList(group: string) : Promise<User[]>{
    var result : User[] = await this.userRepository.createQueryBuilder('User')
    .select('idx,사용,설비,그룹, 태그,addr, comment, value, datatime, vmin, vmax, vsum, vcnt, vavg, scale, offset, alarm_hh, alarm_h, alarm_l, alarm_ll, alarm_result, 설명, 단위, UnitID, Host, Port, CommSetting, CommTimeOutSec, SaveMode, SaveInterval')
    .where({"그룹": group})        
    .orderBy('addr',"ASC")
    .getRawMany()    
    return result;
  }

  async getOne(group: string) : Promise<User>{
    const getAll = await this.All();    
    const user = getAll.find(user => user.그룹 == group);
    console.log(user)
    if (!user) {
      throw new NotFoundException(`user  그룹 ${group} not found`);
    }
    return user
  }

  create(userData: any){
    this.users.push({
      ...userData
    });
  }

  async deleteUser(tag: string): Promise<boolean>{    
    this.getOne(tag);
    this.users = this.users.filter(user => user.태그 !== tag)
    return true;
  }  
  
  WriteJsonData(result: any){          
    const tag_listJson = JSON.stringify(result)    
    fs.writeFileSync('C:/flutterProject/modbusUI/assets/jsonFile/tag_list-json.json',tag_listJson);    
  }
}

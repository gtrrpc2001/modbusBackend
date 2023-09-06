import { Body,Controller,Delete, Get,Param,Patch, Post,Query ,Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/service/user.service';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @Get("/")
  getAll(): Promise<User[]>{    
    return this.userService.getAll();
  }

  @Get("/List")
  getList(@Query("그룹") group: string) : Promise<User[]>{
    return this.userService.getList(group);
  }

  @Get("/One")
  getOne(@Query("그룹") group: string) : Promise<User>{
    return this.userService.getOne(group);
  }

  @Delete("/del")
  remove(@Body("user") userTag: string){
    return this.userService.deleteUser(userTag);
  }

  @Post("/create")
  create(@Body() userData: any){
    return this.userService.create(userData);
  }

  @Patch("/update")
  patch(@Param("tag") userTag: string, @Body() updateData: any){
    return this.userService.updateUser(userTag,updateData);
  }

}

import { IsNumber,IsOptional,IsString } from "class-validator";
import { Double } from "typeorm";

export class BodyDto{

    @IsString()
    readonly groupName: string;

    @IsString()
    readonly tag: string;

    @IsString()
    readonly addr: string;

    @IsNumber()
   readonly updateX: Double;

    @IsNumber()
    readonly updateY: Double;

    @IsOptional()
    @IsString({each: true})
    readonly arr: Double[];
}
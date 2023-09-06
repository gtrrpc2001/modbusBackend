import { Entity, Column, PrimaryGeneratedColumn, Double, Int32 } from 'typeorm';

@Entity('positionXY')
export class positionXY {
    @PrimaryGeneratedColumn()
    idx:number;

    @Column({type:'varchar'})
    groupName:string;

    @Column({type:'varchar'})
    tag:string;

    @Column({type:'varchar'})
    addr:string;

    @Column({type:'double'})
    x:Double;

    @Column({type:'double'})
    y:Double;    

}

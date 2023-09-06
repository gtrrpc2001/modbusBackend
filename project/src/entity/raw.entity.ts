import { Entity, Column, PrimaryGeneratedColumn, Double, Int32 } from 'typeorm';

@Entity('raw')
export class raw {
    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    eq:string;

    @Column({type:'varchar'})
    tag:string;

    @Column({type:'datetime'})
    datatime:string;

    @Column({type:'double'})
    value:string;

    @Column({type:'varchar'})
    ext:string;

    @Column({type:'int'})
    kind:string;

}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ 
        type: 'enum',
        enum: ['open', 'in_progress', 'resolved', 'closed'],
        default: 'open'
    })
    status: 'open' | 'in_progress' | 'resolved' | 'closed';

    @Column({ nullable: true })
    assignedTo: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    priority: 'low' | 'medium' | 'high';
}
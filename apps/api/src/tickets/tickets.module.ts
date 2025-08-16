import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.entity';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [TypeOrmModule.forFeature([Ticket])],
})
export class TicketsModule {}

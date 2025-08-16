import { Controller, Get, Post, Body } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { SupabaseGuard } from "../auth/supabase.guard";
import { UseGuards } from "@nestjs/common";

@Controller("tickets")
@UseGuards(SupabaseGuard) // Protects all routes in this controller
export class TicketsController {
    constructor(private service: TicketsService) {}

    @Get()
    getAll() {
        return this.service.findAll();
    }

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }
}

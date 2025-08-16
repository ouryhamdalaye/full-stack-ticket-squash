// Required NestJS imports for dependency injection and database operations
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';

/**
 * Service responsible for handling ticket-related business logic
 * @Injectable() marks this class as a provider that can be injected into other classes
 */
@Injectable()
export class TicketsService {
    /**
     * Constructor injection of the Ticket repository
     * @param repo - TypeORM repository for Ticket entity
     * 
     * @InjectRepository(Ticket) - Tells NestJS to inject the repository for our Ticket entity
     * private repo: Repository<Ticket> - Creates a private property to store the repository
     */
    private algoliaClient: SearchClient;
    private algoliaIndex: SearchIndex;
    constructor(
        @InjectRepository(Ticket) private repo: Repository<Ticket>,
        private configService: ConfigService
    ){
        this.algoliaClient = algoliasearch(
            this.configService.getOrThrow('ALGOLIA_APP_ID'),
            this.configService.getOrThrow('ALGOLIA_ADMIN_KEY')
        );
        this.algoliaIndex = this.algoliaClient.initIndex('tickets');
    }

    /**
     * Creates a new ticket in the database
     * @param data - Partial ticket data (some fields might be optional)
     * @returns Promise<Ticket> - The newly created ticket
     * 
     *  Creates a new ticket. Partial<Ticket> means all fields are optional
     *  Example: create({ title: "Bug" }) or create({ title: "Bug", description: "Fix me" })
     */
    async create(data: Partial<Ticket>) {
        // repo.save(repo.create(data)) - Creates a new Ticket instance and saves it to the database
        const ticket = await this.repo.save(this.repo.create(data));
        await this.algoliaIndex.saveObject({ ...ticket, objectID: ticket.id });
        return ticket;
    }

    /**
     * Retrieves all tickets from the database
     * @returns Promise<Ticket[]> - Array of all tickets
     */
    findAll() {
        // TODO: Implement method to return all tickets
        return this.repo.find();
    }
}




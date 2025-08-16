// This file implements a NestJS Guard for Supabase authentication
// Guards in NestJS are used to protect routes/endpoints by validating requests

// Import required decorators and types from NestJS
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// Import Supabase client creator
import { createClient } from '@supabase/supabase-js';

@Injectable()
// The class implements CanActivate interface, required for all Guards
export class SupabaseGuard implements CanActivate {
    private supabase;

    constructor(private configService: ConfigService) {
        this.supabase = createClient(
            this.configService.getOrThrow('SUPABASE_URL'),
            this.configService.getOrThrow('SUPABASE_SERVICE_ROLE_KEY'),
        );
    }
    // canActivate is called before protected routes are accessed, returns Promise<boolean> - true allows the request, false denies it
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Get the request object from the execution context
        const req = context.switchToHttp().getRequest();
        // Extract the Authorization header which should contain the JWT
        const authHeader = req.headers.authorization;

        // If no Authorization header exists, deny access
        if(!authHeader) throw new UnauthorizedException('No token provided');
        // Remove 'Bearer ' prefix to get just the token
        const token = authHeader.replace('Bearer ', '');

        // Verify the token with Supabase's auth service and returns the associated user
        const { data: user, error } = await this.supabase.auth.getUser(token);
        if(error || !user) throw new UnauthorizedException('Invalid token');

        // Attach the user object to the request for use in route handlers
        req.user = user;
        
        return true;
    }
}
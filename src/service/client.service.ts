import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Client, ClientDocument} from "../schema/client.schema";
import {ClientDto} from "../dto/client.dto";

@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name, 'Coaching')
                private readonly clientModel: Model<ClientDocument>,
    ) {}

    async createSession(clientId: string, 
                        clientDto: ClientDto): Promise<Client> {
        try {
            // Create a new client document using the SessionDto
            const createdClient = new this.clientModel(ClientDto);

            // Save the client to the database
            return await createdClient.save();
        } catch (error) {
            // Log the error and throw an exception
            throw new InternalServerErrorException('Failed to create client');
        }
    }

    async findSession(clientId: string): Promise<Client> {
        // Find the client by clientId
        return await this.clientModel.findOne ({ clientId }).exec();
    }

    async findSessionByUser(userId: string): Promise<Client[]> {
        const clients = await this.clientModel.find(
            { userId: userId });
        if (!clients || clients.length === 0) {
            throw new NotFoundException('No clients found for this user');
        }
        return clients;
    }

    async updateSessionStatus (clientId: string, status: string): Promise<Client> {
        // Find the client by clientId
        const client = await this.clientModel.findOne({ clientId }).exec();
        
        // Save the updated client
        return await client.save();
    }
}

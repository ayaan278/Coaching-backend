import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Client, ClientDocument} from "../schema/client.schema";
import {ClientDto} from "../dto/client.dto";
import {SessionStatus} from "../enum/session-status.enum";
import {Session, SessionDocument} from "../schema/session.schema";

@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name, 'Coaching')
                private readonly clientModel: Model<ClientDocument>,
                @InjectModel(Session.name, 'Coaching')
                private readonly sessionModel: Model<SessionDocument>,
    ) {}

    async createClient(clientDto: ClientDto): Promise<Client> {
        try {
            // Create a new client document using the SessionDto
            const createdClient = new this.clientModel(clientDto);

            // Save the client to the database
            return await createdClient.save();
        } catch (error) {
            // Log the error and throw an exception
            throw new InternalServerErrorException('Failed to create client');
        }
    }

    async findClient(clientId: string): Promise<Client> {
        // Find the client by clientId
        return await this.clientModel.findOne ({ clientId }).exec();
    }

}

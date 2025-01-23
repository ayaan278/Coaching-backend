import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Client, ClientDocument} from "../schema/client.schema";
import {ClientDto} from "../dto/client.dto";
import {SessionStatus} from "../enum/session-status.enum";
import {Session, SessionDocument} from "../schema/session.schema";
import {UserService} from "./user.service";

@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name, 'Coaching')
                private readonly clientModel: Model<ClientDocument>,
                @InjectModel(Session.name, 'Coaching')
                private readonly sessionModel: Model<SessionDocument>,
                private readonly userService: UserService,
    ) {}

    async createClient(clientDto: ClientDto): Promise<Client> {
        try {
            // Check if the coach exists in user collection
            const coach = await this.userService.getUserById(clientDto.coachId);
            if (!coach) {
                throw new NotFoundException('Coach not found');
            }

            //Check if token is unique
            const token = await this.clientModel.findOne({token: clientDto.token}).exec();
            if (token) {
                throw new NotFoundException('Token already exists');
            }

            // Create a new client document using the SessionDto
            const createdClient = new this.clientModel(clientDto);

            // Save the client to the database
            return await createdClient.save();
        } catch (error) {
            // Log the error and throw an exception
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create client');
        }
    }

    async findClient(clientId: string): Promise<Client> {
        // Find the client by clientId
        return await this.clientModel.findById(clientId).exec();
    }

    async updateClient(clientId: string, clientDto: ClientDto): Promise<Client> {
        const client = await this.clientModel.
        findOneAndUpdate({clientId}, clientDto, {new: true}).exec();
        if (!client) {
            throw new NotFoundException('Client not found');
        }
        return client;
    }

    async updateSessionStatusByClientUsingToken(token: string, status: SessionStatus): Promise<Session> {
        const client = await this.clientModel.findOne({
            token
        }).exec();
        if (!client) {
            throw new NotFoundException('Client not found');
        }
        const session = await this.sessionModel.findOne({
            clientId: client.id
        }).exec();
        if (!session) {
            throw new NotFoundException('Session not found');
        }
        session.status = status;
        return session.save();
    }


    async deleteClient(clientId: string): Promise<any> {
        return await this.clientModel.deleteOne({clientId}).exec();
    }

}

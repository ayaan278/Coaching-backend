import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from '../schema/session.schema';
import { SessionDto } from '../dto/session.dto';

@Injectable()
export class SessionService {
    constructor(@InjectModel(Session.name, 'Coaching')
    private readonly sessionModel: Model<SessionDocument>,
    ) {}

    async createSession(clientId: string, sessionDto: SessionDto): Promise<Session> {
        try {
            // Create a new session document using the SessionDto
            const createdSession = new this.sessionModel(sessionDto);
            createdSession.clientId = clientId;

            // Save the session to the database
            return await createdSession.save();
        } catch (error) {
            // Log the error and throw an exception
            throw new InternalServerErrorException('Failed to create session');
        }
    }

    async findSession(clientId: string): Promise<Session> {
        // Find the session by clientId
        return await this.sessionModel.findOne ({ clientId }).exec();
    }

    async findSessionByUser(userId: string): Promise<Session[]> {
        const sessions = await this.sessionModel.find(
            { userId: userId });
        if (!sessions || sessions.length === 0) {
            throw new NotFoundException('No sessions found for this user');
        }
        return sessions;
    }

    async updateSessionStatus (clientId: string, status: string): Promise<Session> {
        // Find the session by clientId
        const session = await this.sessionModel.findOne({ clientId }).exec();
        session.status = status;
        // Save the updated session
        return await session.save();
    }
}

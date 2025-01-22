import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from '../schema/session.schema';
import { SessionDto } from '../dto/session.dto';
import {SessionStatus} from "../enum/session-status.enum";
import {ClientService} from "./client.service";

@Injectable()
export class SessionService {
    constructor(@InjectModel(Session.name, 'Coaching')
    private readonly sessionModel: Model<SessionDocument>,
    private clientService: ClientService,
    ) {}

    async createSession(sessionDto: SessionDto): Promise<Session> {
        try {
            // Create a new session document using the SessionDto
            const createdSession = new this.sessionModel(sessionDto);

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

    async findSessionByClientIdAndService(clientId: string, status?: SessionStatus): Promise<Session[]> {
        const query = { clientId };
        if (status) query['status'] = status;

        const sessions = await this.sessionModel.find(query).exec();
        if (!sessions.length) {
            throw new NotFoundException('No sessions found');
        }
        return sessions;
    }

    async updateSessionStatus(id: string, sessionId: string, status: SessionStatus): Promise<Session> {
        const session = await this.sessionModel.findById(sessionId).exec();
        if (!session) {
            throw new NotFoundException('Session not found');
        }

        session.status = status;
        return session.save();
    }


    async findSessionByCoachAndStatus(coachId: string,
                                      status?: SessionStatus): Promise<any> {
        if (!status) {
            const sessions = await this.sessionModel.find(
                { coachId: coachId });
            if (!sessions || sessions.length === 0) {
                throw new NotFoundException('No sessions found for this coach');
            }
            return sessions;
        }
        const sessions = await this.sessionModel.find(
            { coachId: coachId, status: status });
        if (!sessions || sessions.length === 0) {
            throw new NotFoundException('No sessions found for this status');
        }

        const totalSessions = sessions.length;
        return {
            totalSessions: totalSessions,
            sessions: sessions
        }
    }

}

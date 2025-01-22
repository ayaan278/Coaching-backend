import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';
import {SessionStatus} from "../enum/session-status.enum";


export type SessionDocument = HydratedDocument<Session>;

@Schema({ collection: 'Session' })
export class Session {
    @Prop({ required: true })
    coachId: string; // Reference to User.

    @Prop({ required: true })
    clientId: string; // Reference to Client.

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    percentageComplete: number = 0;

    @Prop({ required: true })
    completionDate: Date;

    @Prop({ default: false })
    status: SessionStatus = SessionStatus.PENDING;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

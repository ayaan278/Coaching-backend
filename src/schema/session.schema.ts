import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';


export type SessionDocument = HydratedDocument<Session>;

@Schema({ collection: 'Session' })
export class Session {
    @Prop({ required: true })
    coachId: string; // Reference to User.

    @Prop({ required: true })
    clientId: string; // Reference to Client.

    @Prop({ required: true })
    date: Date;

    @Prop({ default: false })
    status: string = 'pending'; // pending, completed, or cancelled.
}

export const SessionSchema = SchemaFactory.createForClass(Session);

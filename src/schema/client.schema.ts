import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ collection: 'Client' })
export class Client {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, ref: 'User' })
    coachId: string; // Reference to User.

    @Prop({ required: true, unique: true })
    token: string; // Reference to the client's token.

    @Prop({ default: [] })
    completedSessions: string[]; // Array of session IDs.

    @Prop({ default: [] })
    upcomingSessions: string[]; // Array of session IDs.
}

export const ClientSchema = SchemaFactory.createForClass(Client);

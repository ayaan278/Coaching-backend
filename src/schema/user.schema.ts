import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'User' })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: false })
    phone?: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false, default: 'active' })
    status?: string;

    @Prop({ required: false, default: Date.now })
    createdAt?: Date ;

    @Prop({ required: false, default: Date.now })
    updatedAt?: Date;

    @Prop({ required: false, default: 'coach' })
    role?: string = 'coach'; // coach or client.
}

export const UserSchema = SchemaFactory.createForClass(User);

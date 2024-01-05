/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<TodoDB>;

@Schema()
export class TodoDB {
    @Prop()
    todo: string;
}

export const TodoSchema = SchemaFactory.createForClass(TodoDB);

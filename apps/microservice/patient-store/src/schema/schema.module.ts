import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from './patient.schema';

@Module({
    imports:[MongooseModule.forFeature(Schemas)],
    exports:[MongooseModule]
})
export class SchemaModule {}

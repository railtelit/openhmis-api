import { Prop, raw,Schema as NestSchema,  SchemaFactory } from "@nestjs/mongoose";
import  { Document, Model, Schema } from "mongoose";

 @NestSchema()
export class IdentifierSchemaClass{
        @Prop()
        type:string;
        @Prop()
        value:string;
}

@NestSchema()
export class PatientAddressSchemaClass{
                @Prop()
                line:string;
                @Prop()
                district:string;
                @Prop()
                state:string;
                @Prop()
                pincode:string;
}
const IdentifierType={type:String,value:String}
@NestSchema({})
export class PatientSchemaClass{
        @Prop()
        healthId:string;
        @Prop()
        healthIdNumber:string;

        @Prop()
        dayOfBirth:number;
        @Prop()
        monthOfBirth:number;
         
        @Prop(raw({line:String,district:String,state:String,pincode:String}))
        address:PatientAddressSchemaClass

         @Prop({type:[IdentifierType]})
         identifiers:IdentifierSchemaClass[]
}


 
export const PatientAddress={                
                name:`PatientAddress`,
                schema: SchemaFactory.createForClass(PatientAddressSchemaClass)
}


export const Patient = {
        name:`Patient`,
        schema: SchemaFactory.createForClass(PatientSchemaClass)
};


export const Identifier = {
         name:`Identifier`,schema:SchemaFactory.createForClass(IdentifierSchemaClass)
}


export type PatientModel=Model<PatientSchemaClass & Document>
export type PatientAddressModel=Model<PatientAddressSchemaClass & Document>
export type IdentifierModel=Model< typeof IdentifierType & Document> ;

export const Schemas=[ Patient,PatientAddress,Identifier ]
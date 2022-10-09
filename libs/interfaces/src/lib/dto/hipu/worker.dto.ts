import { IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString } from "class-validator";

export class GetHSPWorkersDTO{
        @IsNotEmpty()
        serviceid:string

        @IsOptional()        
        org?:{id:number}
}

export class FindOneHSPWorkderDTO{
        @IsNotEmpty()
        userid:string
}

export class AddHSPWorkderDTO{
         @IsNotEmptyObject()
         org:{id:number}

         @IsNotEmpty()
         userid:string
         
         @IsNotEmpty()
         primaryrole:string;

         @IsNotEmptyObject()         
         location:{id:number}

         @IsOptional()
         keycloakid:string

         @IsOptional()
         email:string;
         @IsOptional()
         mobileno:string;

}
export class GetHSPWorkerRolesDTO{
        @IsNotEmpty()        
        userid:string

}

export class AssignHSPWorkerRoleDTO{
        @IsNotEmpty()
        userid:string ; 

        @IsString()
        @IsNotEmpty()
        role:string 

        @IsNotEmptyObject()
        location:{id:number}
}
export class UnAssignHSPWorkerRoleDTO{
        @IsNotEmpty()
        userid:string ; 
        
        @IsNotEmpty()
        roleid:number 
}
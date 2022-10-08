import { IsIn, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHSPOrgDTO{

        @IsNotEmpty()
        orgname:string;
        
        @IsNotEmpty()
        orgtype:string

        @IsNotEmptyObject()
        hsp:{serviceid:string}

        @IsNotEmptyObject()
        parentOrg:{id:number}

}

export class GetAllHSPOrgDTO{
        @IsNotEmpty()
        serviceid:string 
}


export class GetHSPLocationsDTO{
        @IsNotEmpty()
        serviceid:string
}

export class SearchHSPLocationsDTO{
        @IsNotEmpty()
        name:string

        @IsNotEmpty()
        serviceid:string 
}
export class FindOneHSPOrgDTO{
        @IsNotEmpty()
        @IsNumber()
        id:number
}


export class CreateHSPLocationDTO{
        @IsNotEmpty()
        org:{id:number}

        @IsString()
        @IsNotEmpty()
        locationname:string

        @IsOptional()
        roletype:string
        
        @IsOptional()
        physicaltype:string
    }
    
    export class UpdateHSPLocationDTO{
        @IsNotEmpty()
        @IsNumber()
        id:number; 

        @IsString()
        @IsNotEmpty()
        locationname:string
    
        @IsOptional()
        roletype:string
        
        @IsOptional()
        physicaltype:string
        
    }

    export class RemoveHSPLocationDTO{
            @IsNotEmpty()
            id:number 

            @IsOptional()
            remarks:string 
        }
    export class UpdateHSPLocationStatusDTO{
        @IsNotEmpty()
        id:number 

        @IsNotEmpty() 
        @IsIn(['active','inactive'])             
        status:string 

    }


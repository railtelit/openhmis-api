import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export  class SecurityRemoveUserDTO{
            @IsNotEmpty()
            username:string
}
export class FindOneKCUserDTO{
        @IsNotEmpty()
        @IsString()
        username:string
}
export class GetKCUserClientRolesDTO extends FindOneKCUserDTO{ 
        clientId:string      
}

export class CreateKCUserIfNotExistsDTO{
        @IsNotEmpty()
        @MinLength(3)
        @IsString()
        username:string

        @IsOptional()
        email?:string

        @IsNotEmpty()
        @MinLength(3)
        password:string

        @IsOptional()
        roles:string[]
}

export class RemoveKCUserRoleDTO{
        @IsNotEmpty()
        username:string

        @IsNotEmpty()
        clientId:string; 

        @IsNotEmpty()
        rolenames:string[]
}
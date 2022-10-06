import { IsNotEmpty } from "class-validator";


export  class SecurityRemoveUserDTO{
            @IsNotEmpty()
            username:string
}
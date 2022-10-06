import { IsNotEmpty, IsNumber, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';

export class FindOneHSPDTO{
    @IsNotEmpty()
    serviceid?:string
  }
  
  export class SaveHSPDTO{
      @IsNotEmpty()
      serviceid:string;
  
      @IsNotEmpty()
      servicename:string; 
  
      @IsNotEmpty()
      email:string; 
  
      @IsNotEmpty()
      @MinLength(3)
      @MaxLength(10)
      suffix:string;

      @IsOptional()
      @IsNumber()        
      districtCode?:string;

      @IsOptional()
      @IsNumber()        
      stateCode?:string


      @IsOptional()
      service_types:any
  }

  export class setAdminUseridDTO{
        @IsNotEmpty()
        serviceid:string; 

        @IsNotEmpty()
        adminuserid:string ;

        @IsNotEmpty()
        stateCode:string 

        @IsNotEmpty()
        districtCode:string
  }

  export class UnAssignAdminUserDTO{
        @IsNotEmpty()
        serviceid:string
  }
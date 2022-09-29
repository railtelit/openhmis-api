

// 
export interface CreateUserInterface{
        username:string,
        password:string,
        realm:string,
        email?:string,
        client_roles:{[client_name:string]:string[]},        
}
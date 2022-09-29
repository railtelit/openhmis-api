export interface DataInterface<T=any>{
  headers:any, data:T
}

export interface PostDataInterface extends DataInterface{
   context:string,domain:string
}
export interface GetDataInterface extends DataInterface{
   context:string,domain:string,params:any
}



export * from './patient.interface'

export * from './message-patterns.interface'

export * from './security.interface'
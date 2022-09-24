export interface DataInterface<T=any>{
  headers:any, data:T
}

export interface PostDataInterface extends DataInterface{
   context:string,domain:string
}



export * from './patient.interface'

export * from './message-patterns.interface'
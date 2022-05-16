const isProduction =  (process.env.NODE_ENV||'development')==='production'
const DB_USER=  process.env.DB_USER||'test'
const DB_PASSWORD=  process.env.DB_PASSWORD||'test'
const DB_NAME=  process.env.DB_NAME||'test'
const DB_HOST=isProduction?'pg':'localhost' ; 


module.exports=
{
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": DB_USER,
   "password": DB_PASSWORD,
   "database": DB_NAME,
   "synchronize": false,
   "logging": true,
   "entities": [
      "libs/**/entity/**/*.ts"
   ],
   "migrations": [
      "apptypeorm/**/migration/**/*.ts"
   ],
   "subscribers": [
      "libs/**/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "apptypeorm/entity",
      "migrationsDir": "apptypeorm/migration",
      "subscribersDir": "apptypeorm/subscriber"
   }
}
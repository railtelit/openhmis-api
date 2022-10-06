echo "Running Migration Check $1 "

npx typeorm-ts-node-commonjs migration:generate -d ./apps/microservice/$1/src/app/resource/data-source.ts migrations/openhmis

echo "Running Migration  $1 "
npx typeorm-ts-node-commonjs migration:run  -d ./apps/microservice/$1/src/app/resource/data-source.ts
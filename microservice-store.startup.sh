echo "Running Migration Check "

npx typeorm-ts-node-commonjs migration:generate -d ./resource/data-source.ts migrations/openhmis

echo "Running Migration "
npx typeorm-ts-node-commonjs migration:run  -d ./resource/data-source.ts 

echo "Starting PM2 Runtime..."
pm2-runtime --no-auto-exit --watch start main.js
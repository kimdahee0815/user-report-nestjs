// synchronize 옵션 끄고 migration으로만 db 바꿀 때
// synchronize 옵션이 있으면 entity만 바꿔도 db 구조가 완전 바뀌기 때문에 migration으로만 production환경에서는 해야함
// 근데 ormconfig.js로 dev 환경에서는 해야하고, entity 도 dev에서는 js 만 읽기 때문에 js로 해두고
// test 환경에서는 ts 로 바꿔야 함
// tsconfig에 allowJs 추가
// module.exports = {
//   type: 'sqlite',
//   database: 'db.sqlite',
//   entities:
//     process.env.NODE_ENV === 'development'
//       ? ['**/*.entity.js']
//       : ['**/*.entity.ts'],
//   synchronize: false,
// };

// const dbConfig = {
//   synchronize: false,
//   migrations: ['migrations/*.js'],
//   cli: {
//     migrationsDir: 'migrations',
//   },
// };

// switch (process.env.NODE_ENV) {
//   case 'development':
//     Object.assign(dbConfig, {
//       type: 'sqlite',
//       database: 'db.sqlite',
//       entities: ['**/*.entity.js'],
//     });
//     break;
//   case 'test':
//     Object.assign(dbConfig, {
//       type: 'sqlite',
//       database: 'test.sqlite',
//       entities: ['**/*.entity.ts'],
//     });
//     break;
//   case 'production':
//     break;
//   default:
//     throw new Error('unknow environment');
// }

// module.exports = dbConfig;

import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['src/**/*.entity.js'],
  migrations: ['src/migrations/*.js'],
  synchronize: false,
});

// synchronize 옵션 끄고 migration으로만 db 바꿀 때
// synchronize 옵션이 있으면 entity만 바꿔도 db 구조가 완전 바뀌기 때문에 migration으로만 production환경에서는 해야함
// 근데 ormconfig.js로 dev 환경에서는 해야하고, entity 도 dev에서는 js 만 읽기 때문에 js로 해두고
// test 환경에서는 ts 로 바꿔야 함
// tsconfig에 allowJs 추가
module.exports = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities:
    process.env.NODE_ENV === 'development'
      ? ['**/*.entity.js']
      : ['**/*.entity.ts'],
  synchronize: false,
};

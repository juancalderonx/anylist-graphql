
export const EnvConfiguration = () => ({
  
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3024,
  hostAPI: process.env.HOST_API || 'http://localhost:3023',

});
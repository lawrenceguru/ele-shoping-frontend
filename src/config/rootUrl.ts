export default (process.env.PROD ? 'http://localhost:4001' : 'http://localhost:4001');
export const WS_ROOT_URL = `ws://${process.env.PROD ? window.location.host : 'localhost:4001'}`;

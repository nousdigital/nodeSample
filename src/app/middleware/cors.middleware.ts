import cors from 'cors';
import corsGate from 'cors-gate';

const corsOptions = {
  origin: function(origin, callback) {
    // CORS is handled by the cloud environment
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH',  'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: ['nc-token-expires-in', 'CMS-API-Version']
};

export default function setupCorsMiddleware(app) {
  // CORS and friends is handled by the cloud environment
  app.use(cors(corsOptions));
  app.use(corsGate({
    strict: false,
    allowSafe: true,
    origin: '*'
  }));
}


import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-west-2_7EFU4WgQ7',
  ClientId: '2olq0j248jvuu3ja4jgk4gt75o'
};

export default new CognitoUserPool(poolData);
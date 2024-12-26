import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-northeast-1_CkVLOGVwk', // Replace with your Cognito User Pool ID
  ClientId: '7mi6pdj5nih9cpubdvs8bl9evv',     // Replace with your App Client ID
};

const UserPool = new CognitoUserPool(poolData);
export default UserPool;

import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path: path.join(process.cwd(), ".env")});


export default {
	port: 5000,
	jwt: {
		jwt_secret: process.env.JWT_SECRET,
		expires_in: process.env.EXPIRES_IN,
	},
	salt_round: process.env.SALT_ROUND,
};
// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number,
    USER_SERVICE:string
    PROBLEM_SERVICE:string
    SUBMISSION_SERVICE:string
    EVALUATION_SERVICE:string
    JWT_ACCESS_SECRET:string
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3000,
    USER_SERVICE:process.env.USER_SERVICE || "http://localhost:3004/api/v1",
    PROBLEM_SERVICE:process.env.PROBLEM_SERVICE || "http://localhost:3001/api/v1",
    EVALUATION_SERVICE:process.env.EVALUATION_SERVICE || "http://localhost:3003/api/v1",
    SUBMISSION_SERVICE:process.env.SUBMISSION_SERVICE || "http://localhost:3002/api/v1",
    JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET || ""

};
import type { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { serverConfig } from "../../config";

export const userMiddleware= createProxyMiddleware<Request,Response>({
    target: serverConfig.USER_SERVICE,
    changeOrigin:true,
    pathRewrite: {
      '^/api/v1/': ''
    },
})

export const problemMiddleware= createProxyMiddleware<Request,Response>({
    target: serverConfig.PROBLEM_SERVICE,
    changeOrigin:true,
    pathRewrite: {
      '^/api/v1/': ''
    },
})


export const submissionMiddleware= createProxyMiddleware<Request,Response>({
    target: serverConfig.SUBMISSION_SERVICE,
    changeOrigin:true,
    pathRewrite: {
      '^/api/v1/': ''
    },
})


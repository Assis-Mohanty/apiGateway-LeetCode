import type { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { serverConfig } from "../../config";

export const userMiddleware = createProxyMiddleware<Request, Response>({
  target: serverConfig.USER_SERVICE,
  changeOrigin: true,
  pathRewrite: {
    '^/api/v1/users': '/users',
  },
  timeout: 5000,
  proxyTimeout: 5000,
 on: {
  proxyReq: (proxyReq, req: Request) => {
    const user = (req as any).user;

    if (user) {
      proxyReq.setHeader('x-user-id', user.userId);
      proxyReq.setHeader('x-user-role', user.role);
    }

    if (req.headers['x-request-id']) {
      proxyReq.setHeader(
        'x-request-id',
        req.headers['x-request-id'] as string
      );
    }
  },

  error: (err, req, res) => {
    if (res && 'status' in res) {
      (res as Response).status(503).json({
        success: false,
        message: 'User service unavailable',
      });
    }
  },
}

});



export const problemMiddleware= createProxyMiddleware<Request,Response>({
    target: serverConfig.PROBLEM_SERVICE,
    changeOrigin:true,
    pathRewrite: {
      '^/api/v1/problems': '/problems'
    },
})


export const submissionMiddleware= createProxyMiddleware<Request,Response>({
    target: serverConfig.SUBMISSION_SERVICE,
    changeOrigin:true,
    pathRewrite: {
      '^/api/v1/submissions': '/submissions'
    },
})


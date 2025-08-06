import { Injectable, NestMiddleware, UnsupportedMediaTypeException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { acceptedContentTypes } from "../constant/accepted-content-type.constant";

@Injectable()
export class ContentTypeMiddleware implements NestMiddleware {
  public use(req: Request, _: Response, next: NextFunction) {
    const body: unknown = req.body;

    //pass if there is no request body
    if (!body || !Object.keys(body).length) {
      return next();
    }

    //extract the content type from the request header
    const contentType = req.headers["content-type"];

    //throw if the content type is missing
    if (!contentType) {
      throw new UnsupportedMediaTypeException("content-type is not supported");
    }

    //throw if the provided content-type is not in the accepted list
    const isAccepted = acceptedContentTypes.find(
      (acceptedContentType) => acceptedContentType === contentType,
    );

    if (!isAccepted) {
      throw new UnsupportedMediaTypeException("content-type is not supported");
    }

    return next();
  }
}

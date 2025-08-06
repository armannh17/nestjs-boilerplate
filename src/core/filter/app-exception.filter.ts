import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { Response } from "express";
import { TimeoutError } from "rxjs";
import { ResponseDto } from "src/shared/dto/response.dto";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor() {}

  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    //check for auth error
    if (
      exception instanceof TokenExpiredError ||
      exception instanceof JsonWebTokenError ||
      exception instanceof TypeError
    ) {
      return this.handleUnauthorizedError(res);
    }

    //check for bad request error
    if (exception instanceof BadRequestException) {
      return this.handleWrongInutError(res);
    }

    //check for http error
    if (exception instanceof HttpException) {
      return this.handleHttpError(exception, res);
    }

    //check for timeout error
    if (exception instanceof TimeoutError) {
      return this.handleTimeoutError(res);
    }

    //unknown error, log it and return internal server error
    this.handleUnknownError(exception, res);
  }

  private handleUnauthorizedError(res: Response): void {
    const status = HttpStatus.UNAUTHORIZED;
    const message = "invalid credentials provided";

    res.status(status).json(new ResponseDto(status, message, null));
  }

  private handleWrongInutError(res: Response): void {
    const status = HttpStatus.BAD_REQUEST;
    const message = "some fields are missing or invalid";

    res.status(status).json(new ResponseDto(status, message, null));
  }

  private handleHttpError(exception: HttpException, res: Response): void {
    const status = exception.getStatus();
    const message = exception.message;

    res.status(status).json(new ResponseDto(status, message, null));
  }

  private handleTimeoutError(res: Response): void {
    const status = HttpStatus.REQUEST_TIMEOUT;
    const message = "request timed out";

    res.status(status).json(new ResponseDto(status, message, null));
  }

  private handleUnknownError(exception: unknown, res: Response): void {
    console.error(exception);

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = "internal server error";

    res.status(status).json(new ResponseDto(status, message, null));
  }
}

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { Response } from "express";
import { TimeoutError } from "rxjs";
import { InvalidCredentialException } from "src/application/user/exception/invalid-credential.exception";
import { ReferralNotFoundException } from "src/application/user/exception/referral-not-found.exception";
import { ResponseDto } from "src/platform/shared/dto/response.dto";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);

  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception instanceof ReferralNotFoundException) {
      return this.handleDomainError(res, HttpStatus.NOT_FOUND, exception.message);
    }

    if (exception instanceof InvalidCredentialException) {
      return this.handleDomainError(res, HttpStatus.UNAUTHORIZED, exception.message);
    }

    if (
      exception instanceof TokenExpiredError ||
      exception instanceof JsonWebTokenError ||
      exception instanceof TypeError
    ) {
      return this.handleUnauthorizedError(res);
    }

    if (exception instanceof BadRequestException) {
      return this.handleWrongInutError(res);
    }

    if (exception instanceof HttpException) {
      return this.handleHttpError(exception, res);
    }

    if (exception instanceof TimeoutError) {
      return this.handleTimeoutError(res);
    }

    this.handleUnknownError(exception, res);
  }

  private handleDomainError(res: Response, status: HttpStatus, message: string): void {
    res.status(status).json(new ResponseDto(status, message, null));
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
    this.logger.error(exception);

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = "internal server error";

    res.status(status).json(new ResponseDto(status, message, null));
  }
}

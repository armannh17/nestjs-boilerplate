import { HttpStatus } from "@nestjs/common";

export class ResponseDto<T = null> {
	public readonly status: HttpStatus;
	public readonly message: string;
	public readonly data: T;

	constructor(status: HttpStatus, message: string, data: T) {
		this.status = status;
		this.message = message;
		this.data = data;
	}
}

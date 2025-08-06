import { applyDecorators, HttpStatus, Type } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ResponseDto } from "../dto/response.dto";

export const ApiResponseWrapper = <T extends Type<unknown>>(
  model: T,
  status: HttpStatus = HttpStatus.OK,
) => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, model),
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};

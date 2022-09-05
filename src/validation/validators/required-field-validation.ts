import { MissingParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols/validation";

export class RequiredFielValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}

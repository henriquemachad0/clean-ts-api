import { makeLoginValidation } from "./login-validation-factory";
import { EmailValidator } from "@/validation/protocols/email-validator";
import {
  ValidationComposite,
  RequiredFielValidation,
  EmailValidation,
} from "@/validation/validators"
import { Validation } from "@/presentation/protocols/validation";

jest.mock("../../../../../validation/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe("LoginValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ["email", "password"]) {
      validations.push(new RequiredFielValidation(field));
    }
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});

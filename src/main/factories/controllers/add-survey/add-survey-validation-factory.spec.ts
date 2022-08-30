import {
  ValidationComposite,
  RequiredFielValidation,
  EmailValidation,
} from "../../../../validation/validators";
import { Validation } from "../../../../presentation/protocols/validation";
import { EmailValidator } from "../../../../validation/protocols/email-validator";
import { makeAddSurveyValidation } from "./add-survey-validation-factory";

jest.mock("../../../../validation/validators/validation-composite");

describe("AddSurveyValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [];
    for (const field of ["question", "answers"]) {
      validations.push(new RequiredFielValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});

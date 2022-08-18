import { MissingParamError } from "../../errors";
import { RequiredFielValidation } from "./required-field-validation";

const makeSut = () => {
    return new RequiredFielValidation("field");
}

describe("RequiredField Validation", () => {
  test("Should return a MissingParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ name: "any_name" });
    expect(error).toEqual(new MissingParamError("field"));
  });

  test("Should not return if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate({ name: "any_name" });
    expect(error).toBeFalsy();
  });
});

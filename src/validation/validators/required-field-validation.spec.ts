import { RequiredFielValidation } from "./required-field-validation";
import { MissingParamError } from "@/presentation/errors/missing-param-error";

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
    const error = sut.validate({ field: "any_name" });
    expect(error).toBeFalsy();
  });
});

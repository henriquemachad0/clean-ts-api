import { Authentication } from "../../../domain/usecases/authentication";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { EmailValidator } from "../signup/signup-protocols";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentiacation: Authentication;

  constructor(emailValidator: EmailValidator, authentiacation: Authentication) {
    this.emailValidator = emailValidator;
    this.authentiacation = authentiacation;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["email", "password"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, password } = httpRequest.body;
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
      await this.authentiacation.auth(email, password);
    } catch (error) {
      return serverError(error);
    }
  }
}

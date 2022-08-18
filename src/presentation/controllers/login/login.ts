import { InvalidParamError, MissingParamError } from "../../errors";
import {
  badRequest,
  serverError,
  unauthorized,
  ok,
} from "../../helpers/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication,
  EmailValidator,
} from "./login-protocols";

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
      const accessToken = await this.authentiacation.auth(email, password);
      if (!accessToken) {
        return unauthorized();
      }
      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}

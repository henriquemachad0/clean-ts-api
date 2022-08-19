import { InvalidParamError, MissingParamError } from "../../errors";
import {
  badRequest,
  serverError,
  unauthorized,
  ok,
} from "../../helpers/http/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication,
  Validation,
} from "./login-protocols";

export class LoginController implements Controller {
  private readonly validation: Validation;
  private readonly authentiacation: Authentication;

  constructor(authentiacation: Authentication, validation: Validation) {
    this.validation = validation;
    this.authentiacation = authentiacation;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { email, password } = httpRequest.body;
      const accessToken = await this.authentiacation.auth({ email, password });
      if (!accessToken) {
        return unauthorized();
      }
      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}

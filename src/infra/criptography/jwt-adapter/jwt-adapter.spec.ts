import jwt from "jsonwebtoken";
import { JwtAdapter } from "./jwt-adapter";

describe("Jwt Adapater", () => {
  test("Should call sign with correct values", async () => {
    const sut = new JwtAdapter("secret");
    const signSpy = jest.spyOn(jwt, "sign");
    await sut.encrypt("any_id");
    expect(signSpy).toHaveBeenCalledWith({ id: "any_id" }, "secret");
  });
});

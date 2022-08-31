import { Decrypter } from "../../protocols/criptography/decrypter";
import { DbLoadAccountByToken } from "./db-load-account-by-token";

describe("DbLoadAccountByToken Usecase", () => {
  test("Should call Decrypter with correct values", () => {
    class DecrypterStub implements Decrypter {
      async decrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("any_value"));
      }
    }
 
    const decrypterStub = new DecrypterStub();
    const decryptSpy = jest.spyOn(decrypterStub, "decrypt")
    const sut = new DbLoadAccountByToken(decrypterStub);
    sut.load("any_token");
    expect(decryptSpy).toHaveBeenCalledWith("any_token")
  });
});

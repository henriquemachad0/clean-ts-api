import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  TokenGenerator,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from "./db-authentication-protocols";

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly hashComparer: HashComparer;
  private readonly tokenGenerator: TokenGenerator;
  private readonly updateAccessTokenRepostory: UpdateAccessTokenRepository;

  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepostory: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.tokenGenerator = tokenGenerator;
    this.updateAccessTokenRepostory = updateAccessTokenRepostory;
  }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    );
    if (account) {
      const isValid = await this.hashComparer.compare(
        authentication.password,
        account.password
      );
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id);
        await this.updateAccessTokenRepostory.update(account.id, accessToken)
        return accessToken;
      }
    }
    return null;
  }
}

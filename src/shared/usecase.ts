export abstract class UseCase<Request> {
  abstract handle(request: Request): Promise<void>;

  public async execute(request: Request): Promise<void> {
    return await this.handle(request);
  }
}

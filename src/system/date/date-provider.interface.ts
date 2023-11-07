export const DATE_PROVIDER = Symbol('DATE_PROVIDER');

export interface DateProvider {
  getDate(): Date;
}

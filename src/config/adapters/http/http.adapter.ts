export abstract class HttpAdapter {
  abstract get(url: string): Promise<any>;
}

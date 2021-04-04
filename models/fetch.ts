export interface RouteCtx {
  params?: any;
  request?: any;
  response?: any;
  [propName: string]: any;
}

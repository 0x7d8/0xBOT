import { MiddlewareToProps } from "rjweb-server"
import { Props as AdditionalProps1 } from "rjweb-server-ratelimit"

declare module "rjweb-server" {
  export interface HTTPRequestContext extends MiddlewareToProps<[ AdditionalProps1 ]> {}
}
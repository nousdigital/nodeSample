import { Router } from "express-serve-static-core";

export interface RouterInterface {
  createRoutes(): Router;
}

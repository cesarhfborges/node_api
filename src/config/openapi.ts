import { Application } from "express";
import {bearerAuth, OpenApi, textPlain} from "ts-openapi";
import swaggerUi from "swagger-ui-express";

// create an OpenApi instance to store definitions
export const openApiInstance = new OpenApi(
  "v1.0", // API version
  "Our Awesome Api", // API title
  "Describing how to keep APIs documented.", // API description
  "nelson.gomes@pipedrive.com" // API maintainer
);

// declare servers for the API
openApiInstance.setServers([{ url: "http://localhost:3030" }]);

// set API license
openApiInstance.setLicense(
  "Apache License, Version 2.0", // API license name
  "http://www.apache.org/licenses/LICENSE-2.0", // API license url
  "http://dummy.io/terms/" // API terms of service
);

export function initOpenApi(app: Application, openApi: OpenApi) {
  // generate our OpenApi schema
  const openApiJson = openApi.generateJson();

  // we'll create an endpoint to reply with openapi schema
  app.get("/openapi.json", function (_req, res) {
    res.json(openApiJson);
  });
  // this will make openapi UI available with our definition
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiJson));
}


export function setupOpenAPI(app: Application, openApi: OpenApi) {

  // declare our API
  openApi.addPath(
    "/", // this is API path
    {
      // API method
      get: {
        description: "Hello world", // Method description
        summary: "Demo get request to show how to declare APIs", // Method summary
        operationId: "get-hello-op", // an unique operation id
        responses: {
          // here we declare the response types
          200: textPlain("Successful Operation"),
        },
        tags: ["Dummy Apis"], // these tags group your methods in UI
      },
    },
    true // make method visible
  );
}
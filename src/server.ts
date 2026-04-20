import cors from "cors";
import clientApiRouter from "./client-api";
import express from "express";
import OpenAPIBackend from "openapi-backend";
import swaggerUi from "swagger-ui-express";
import * as fs from "fs";
import * as path from "path";

import { StudyService_list } from "./handlers/StudyService_list";
import { StudyService_create } from "./handlers/StudyService_create";
import { StudyService_get } from "./handlers/StudyService_get";
import { StudyService_update } from "./handlers/StudyService_update";
import { StudyService_delete } from "./handlers/StudyService_delete";
import { StudyService_summary } from "./handlers/StudyService_summary";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/client-api", clientApiRouter);
app.use("/client", express.static(path.join(__dirname, "../client")));

const specPath = path.join(__dirname, "..", "openapi.yaml");

const api = new OpenAPIBackend({
  definition: specPath,
  validate: true,
});

api.register({
  StudyService_list,
  StudyService_create,
  StudyService_get,
  StudyService_update,
  StudyService_delete,
  StudyService_summary,
  validationFail: (_c, _req, res) =>
    res.status(400).json({ code: 400, message: "Bad Request" }),
  notFound: (_c, _req, res) =>
    res.status(404).json({ code: 404, message: "Not Found" }),
});

api.init();

app.get("/openapi.yaml", (_req, res) => {
  res.setHeader("Content-Type", "text/yaml");
  res.send(fs.readFileSync(specPath, "utf-8"));
});

app.get("/openapi.json", (_req, res) => {
  res.json(api.document);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, {
  swaggerOptions: { url: "/openapi.yaml" },
}));

app.use((req, res) => api.handleRequest(req as any, req, res));

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`UX Research API running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/docs`);
});
import express from "express";
import cors from "cors";
import OpenAPIBackend from "openapi-backend";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import * as handlers from "./handlers";

const app = express();
app.use(express.json());
app.use(cors());

const specPath = path.join(__dirname, "..", "studyopenapi.yaml");

const api = new OpenAPIBackend({ definition: specPath, validate: true });

api.register({
  ...handlers,
  validationFail: (_c, _req, res) => res.status(400).json({ code: 400, message: "Bad Request" }),
  notFound:       (_c, _req, res) => res.status(404).json({ code: 404, message: "Not Found" }),
});

api.init();

app.get("/openapi.yaml", (_req, res) => res.setHeader("Content-Type", "text/yaml").send(fs.readFileSync(specPath, "utf-8")));
app.get("/openapi.json", (_req, res) => res.json(api.document));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: "/openapi.yaml" } }));
app.use("/client", express.static(path.join(__dirname, "..", "client")));
app.use((req, res) => api.handleRequest(req as any, req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\nUX Research API running → http://localhost:${PORT}`);
  console.log(`Swagger UI          → http://localhost:${PORT}/docs\n`);
});

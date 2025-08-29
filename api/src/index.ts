import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connect } from "./repository/database";
import { routes } from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.use(
	cors({
		origin: process.env.CORS_ORIGIN?.split(","),
	}),
);

app.use(express.json());

app.use("/api", routes);

app.listen({ port: Number(port), host }, async (err?: Error) => {
	if (err) {
		console.error("[SERVER] Error starting server:", err);
		process.exit(1);
	}
	await connect();

	console.log(`[SERVER] Server listening at http://${host}:${port}`);
});

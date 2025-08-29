import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(
	cors({
		origin: process.env.CORS_ORIGIN?.split(","),
	}),
);

app.get("/", (_, res) => {
	res.send("Hello World!");
});

app.listen({ port: Number(port), host }, (err?: Error) => {
	if (err) {
		console.error("Error starting server:", err);
		process.exit(1);
	}
	console.log(`Server listening at http://${host}:${port}`);
});

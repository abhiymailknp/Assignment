import fastify, { FastifyInstance } from "fastify";
import { db } from "./connection/db";
import { userRoutes } from "./Routes/user.route";
import fastifyCors from "@fastify/cors";

const app: FastifyInstance = fastify({ logger: true });

app.register(fastifyCors)
app.register(userRoutes,{db});

const start = async () => {
	try {
		await db.connect();
		console.log("Connected to the database!");
		await app.listen({ port: 3001 });
		console.log("Server is listening on http://localhost:3001");
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();

import fastify, { FastifyInstance } from "fastify";
import { db } from "./connection/db";
import { userRoutes } from "./Routes/user.route";

const app: FastifyInstance = fastify({ logger: false });

app.register(userRoutes,{db});

const start = async () => {
	try {
		await db.connect();
		console.log("Connected to the database!");
		await app.listen({ port: 3001 });
		console.log("Server is listening on http://localhost:3000");
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();

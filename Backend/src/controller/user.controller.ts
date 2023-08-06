import { FastifyReply, FastifyRequest } from "fastify";
import { User, hashPassword, isPasswordvalid } from "../Models/User.Model";
import { db } from "../connection/db";

export const userSignupController = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const { firstName, lastName, email, phoneNumber, password } =
		request.body as User;
	try {
		const hashedPassword = await hashPassword(password);

		// console.log(hashedPassword);

		const data = await db.one(
			"INSERT INTO users(FirstName, LastName, Email, ContactNumber, Password) VALUES($1, $2, $3, $4, $5) RETURNING *",
			[firstName, lastName, email, phoneNumber, hashedPassword]
		);
		reply.send(data);
	} catch (error) {
		console.error("Error creating user:", error);
		reply.code(500).send("Error creating user");
	}
};

export const userSigninController = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const { email, password } = request.body as {
		email: string;
		password: string;
	};
	try {
		const user: User | null = await db.oneOrNone(
			"SELECT * FROM users WHERE Email = $1",
			email
		);
        // console.log(user?.password);
        
		if (!user) {
			reply.code(404).send({ message: "User not found" });
			return;
		}
		const isMatch = await isPasswordvalid(password, user.password);
		// console.log(isMatch);
		
		if (!isMatch) {
			reply.code(401).send({ message: "Incorrect password" });
			return;
		}
		reply.send({ message: "Successfully signed in" });
	} catch (error) {
		console.error("Error signing in:", error);
		reply.code(500).send({ message: "Error signing in" });
	}
};

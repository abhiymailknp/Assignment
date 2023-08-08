import { FastifyRequest,FastifyReply } from "fastify";
import { User } from "../Models/User.Model";
import { db } from "../connection/db";

const validateInput = async (request : FastifyRequest,reply : FastifyReply,done: () => void) => {


        //to check the control of program is within validateInput
        console.log("Inside Validate Input");
        
		const { firstName, lastName, email, phoneNumber, password } =
			request.body as User;

		//First Name/Last Name Validation
		if (
			!firstName ||
			!lastName ||
			firstName.length < 2 ||
			lastName.length < 2 ||
			firstName.length > 20 ||
			lastName.length > 20
		) {
			reply.code(400).send({message: "Invalid FirstName or LastName"});
			return done();
		}

		//Email Validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !emailRegex.test(email)) {
			reply.code(400).send({message:"Invalid Email"});
			
			return done();
		}

		const user: User | null = await db.oneOrNone(
			"SELECT * FROM users WHERE Email = $1",
			email
		);
        
		if (user) {
			reply.code(400).send({ message: "User Already present" });
			return;
		}

		const phoneNumberRegex = /^\d{10}$/;
		if (!phoneNumber || !phoneNumberRegex.test(phoneNumber)) {
			reply.code(400).send({message:"Invalid PhoneNumber"});
			return done();
		}

		// Validate Password
		const passwordRegex =
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,16}$/;
		if (!password || !passwordRegex.test(password)) {
			reply.code(400).send({message:"Invalid Password"});
			return done();
		}

        done();
	};


export default validateInput;

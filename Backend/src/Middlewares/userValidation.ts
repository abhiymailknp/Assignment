import { FastifyRequest,FastifyReply } from "fastify";
import { User } from "../Models/User.Model";

const validateInput = (request : FastifyRequest,reply : FastifyReply,done: () => void) => {


        //to check the control of program is within validateInput
        console.log("Inside Validate Input");
        
		const { FirstName, LastName, Email, PhoneNumber, Password } =
			request.body as User;

		//First Name/Last Name Validation
		if (
			!FirstName ||
			!LastName ||
			FirstName.length < 2 ||
			LastName.length < 2 ||
			FirstName.length > 20 ||
			LastName.length > 20
		) {
			reply.code(400).send("Invalid FirstName or LastName");
			return done();
		}

		//Email Validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!Email || !emailRegex.test(Email)) {
			reply.code(400).send("Invalid Email");
			return done();
		}

		//PhoneNumber Validation
		const phoneNumberRegex = /^\d{10}$/;
		if (!PhoneNumber || !phoneNumberRegex.test(PhoneNumber)) {
			reply.code(400).send("Invalid PhoneNumber");
			return done();
		}

		// Validate Password
		const passwordRegex =
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,16}$/;
		if (!Password || !passwordRegex.test(Password)) {
			reply.code(400).send("Invalid Password");
			return done();
		}

        done();
	};


export default validateInput;

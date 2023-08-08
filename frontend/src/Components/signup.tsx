import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface SignUpFormValues {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
}

const SignupForm: React.FC = () => {
	const [formData, setFormData] = useState<SignUpFormValues>({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
		password: "",
	});

	const errors: Partial<SignUpFormValues> = {};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			let data = JSON.stringify(formData);
			
				let config = {
					method: "post",
					maxBodyLength: Infinity,
					url: "http://localhost:3001/signup",
					headers: {
						"Content-Type": "application/json",
					},
					data: data,
				};
				axios
					.request(config)
					.then((response) => {
						console.log(JSON.stringify(response.data));
					})
					.catch((error) => {
						alert(error.response.data.message);
						
					});
			
		}
	};

	const onFocusValidationErrors = (fieldName:String)=>{
		const errors: Partial<SignUpFormValues> = {};
		if (
			fieldName === "firstname" && (!formData.firstName ||
			formData.firstName.length < 3 ||
			formData.firstName.length > 20)
		) 
		{
			errors.firstName = "First Name should be between 3-20 characters";
			return "First Name should be between 3-20 characters";
		}
		if (
			fieldName === "lastName" && (!formData.lastName ||
			formData.lastName.length < 3 ||
			formData.lastName.length > 20)
		) 
		{
			errors.lastName = "Last Name should be between 3-20 characters";
			return "Last Name should be between 3-20 characters";
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (fieldName === "email" &&(!formData.email || !emailRegex.test(formData.email))) 
		{
			errors.email = "Invalid Email";
			return "Invalid Email";
		}

		const phoneNumberRegex = /^\d{10}$/;
		if (fieldName === "phoneNumber" &&(!formData.phoneNumber || !phoneNumberRegex.test(formData.phoneNumber))) {
			errors.phoneNumber = "Invalid PhoneNumber";
			return "Invalid Phone Number"
		}

		const passwordRegex =
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,16}$/;
		if (fieldName === "password" && (!formData.password || !passwordRegex.test(formData.password))){
			errors.password = "Password should be min between 8-16 characters and must include 1 Uppercase,1 lowercase,1 integer,1 speacial characters";
			return "Password should be min between 8-16 characters and must include 1 Uppercase,1 lowercase,1 integer,1 speacial characters";
		}
	}

	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<form
				onSubmit={handleSubmit}
				className="w-75 p-4 border rounded bg-light"
			>
				<h2 className="mb-4">Sign Up</h2>
				<div className="mb-3">
					<label className="form-label">
						First Name:
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className="form-control"
						/>
						
							<div className="text-danger">{onFocusValidationErrors('firstname')}</div>
						
					</label>
				</div>
				<div className="mb-3">
					<label className="form-label">
						Last Name:
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className="form-control"
						/>
						<div className="text-danger">{onFocusValidationErrors('lastName')}</div>
					</label>
				</div>
				<div className="mb-3">
					<label className="form-label">
						PhoneNumber:
						<input
							type="text"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleChange}
							className="form-control"
						/>
						<div className="text-danger">{onFocusValidationErrors('phoneNumber')}</div>
					</label>
				</div>
				<div className="mb-3">
					<label className="form-label">
						Email:
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="form-control"
						/>
						<div className="text-danger">{onFocusValidationErrors('email')}</div>
					</label>
				</div>
				<div className="mb-3">
					<label className="form-label">
						Password:
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="form-control"
						/>
						<div className="text-danger">{onFocusValidationErrors('password')}</div>
					</label>
				</div>
				<div className="d-flex justify-content-center">
					<button type="submit" className="btn btn-primary">
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignupForm;

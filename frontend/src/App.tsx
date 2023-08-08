import { Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import React from "react";
import SignupForm from "./Components/signup";
import SigninForm from "./Components/signin";
import "bootstrap/dist/css/bootstrap.min.css";

const Home:React.FC = ()=>{
	return (
		<div className="mt-3 alert alert-info">
			Please sign up or sign in to test this app.
		</div>
	)
}

const App = () => {
	return (
		<Router>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<div className="container">
					<div
						className="collapse navbar-collapse justify-content-end"
						id="navbarNav"
					>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link to="/signup" className="nav-link">
									Sign Up
								</Link>
							</li>
							<li>
								<Link to="/signin" className="nav-link">
									Sign In
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div className="container mt-5">
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/signup" element={<SignupForm />} />
					<Route path="/signin" element={<SigninForm />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;

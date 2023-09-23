import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import History from "../components/History";
import Home from "../components/Home";
import "./styles.css";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<div className="navbar-container">
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive ? "navbar-link-active" : "navbar-link"
					}
				>
					Home
				</NavLink>
				<NavLink
					to="/history"
					className={({ isActive }) =>
						isActive ? "navbar-link-active" : "navbar-link"
					}
				>
					History
				</NavLink>
			</div>
			<div className="search-container">
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/history" element={<History />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default AppRoutes;

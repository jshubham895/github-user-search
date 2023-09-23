import { useState } from "react";
import { toast } from "react-toastify";
import "./styles.css";
import User from "./User";

function SearchUser() {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState("");
	const [noResult, setNoResult] = useState(false);
	const [firstClick, setFirstClick] = useState(false);

	const getUsers = async (e) => {
		try {
			e.preventDefault();
			setUsers([]);
			setFirstClick(true);

			const result = await fetch(
				`https://api.github.com/search/users?q=${encodeURIComponent(
					name
				)}&per_page=5`
			);
			const response = await result.json();
			const data = response?.items ?? [];
			const formattedData = data.map((item) => ({
				name: item.login,
				imageUrl: item.avatar_url
			}));

			const searchHistory = JSON.parse(localStorage.getItem("history")) ?? [];
			const newSearchHistory = [
				...searchHistory,
				{ query: name, result: formattedData.length ? formattedData : [] }
			];
			localStorage.setItem("history", JSON.stringify(newSearchHistory));

			if (data.length) {
				setUsers(formattedData);
				setNoResult(false);
			} else {
				setNoResult(true);
			}
		} catch (error) {
			console.log(error);
			toast.error("Error while fetching data.");
			setNoResult(true);
		}
	};

	return (
		<div className="container">
			<span className="title">Search GitHub User</span>
			<form className="form-container" onSubmit={getUsers}>
				<div className="searchbox">
					<input
						className="icon"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<button className="submit" type="submit">
					Search
				</button>
			</form>
			<div className="search-results">
				{firstClick ? (
					noResult ? (
						<span style={{ color: "#9799B0" }}>Search result not found</span>
					) : (
						<span style={{ color: "#9799B0" }}>Search Results </span>
					)
				) : null}
				{users.map((user, i) => {
					return <User key={i} user={user} />;
				})}
			</div>
		</div>
	);
}

export default SearchUser;

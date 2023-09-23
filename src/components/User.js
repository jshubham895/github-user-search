import React from "react";
import "./styles.css";

const User = ({ user, style }) => {
	return (
		<div style={style} className="flexbox">
			<div className="flex-item">
				<span style={{ color: "#B7B9C9" }}>User Image</span>
				<img className="user-img" src={user?.imageUrl} alt="user_image" />
			</div>
			<div className="flex-item">
				<span style={{ color: "#B7B9C9" }}>GitHub User Name</span>
				<span style={{ color: "#81849C" }}>{user?.name}</span>
			</div>
		</div>
	);
};

export default User;

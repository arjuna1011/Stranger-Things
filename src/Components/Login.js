import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function sendLoginReq(e) {
        e.preventDefault();
        try {
            console.log("Username is " + username);
            console.log("Password is " + password);

            if (username.length == 0) {
                alert("Please enter a username.")
                return;
            } else if (password.length == 0) {
                alert("Please enter a password.")
                return;
            }

            const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            })
            const translatedData = await response.json();
            console.log(translatedData)
            if (!translatedData.success) {
                alert("Login failed. Please try again!")
            } else {
                const myJWT = translatedData.data.token;
                localStorage.setItem("token", myJWT)
                navigate("/")
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={sendLoginReq}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;

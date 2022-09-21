import * as React from "react";
import "./index.scss";
import Layout from "../../Layout";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showRegister, setShowRegister] = React.useState(false);
  const [name, setName] = React.useState("");

  const handeleLoginClick = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await res.json();
    console.log("status", res.status);
    console.log("result", result);
  };

  const handeleRegisterClick = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/user/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
    const result = await res.json();
    console.log("status", res.status);
    console.log("result", result);
  };

  if (showRegister) {
    return (
      <Layout>
        <div className="Login">
          <form className="box" onSubmit={handeleRegisterClick}>
            <h1 className="h1-login">Register</h1>

            <hr />
            <div className="input-group">
              <div className="label">Email</div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <div className="label">Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <div className="label">Name</div>
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div
              className="toggle-register"
              onClick={() => setShowRegister(false)}
            >
              I already have an account
            </div>

            <button type="submit">send</button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="Login">
        <form className="box" onSubmit={handeleLoginClick}>
          <h1 className="h1-login">Login</h1>
          <p>Log in to your STAR SHOP account.</p>
          <hr />
          <div className="input-group">
            <div className="label">Email</div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="label">Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div
            className="toggle-register"
            onClick={() => setShowRegister(true)}
          >
            I don't have an account yet
          </div>

          <button type="submit">send</button>
        </form>
      </div>
    </Layout>
  );
}

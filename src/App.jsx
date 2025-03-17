import React, { useState } from "react"; 
import "./index.css"

function App() {
  return (
    <div className="main" >
      <h1>Your Chosen Email Verifier</h1>
      <EmailVerifier />
    </div>
  );
}


function EmailVerifier() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyEmail = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`https://verifyright.co/api/v1/verify/${email}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Error verifying email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verifierContainer">
      <h2 className="me">Email Verification</h2>
      <input
        type="email"
        placeholder="Enter email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={verifyEmail} disabled={loading}>
        {loading ? "Verifying..." : "Verify Email"}
      </button>

      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result">
          <h3>Verification Result</h3>
          <p>Email: {result.email}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
}


export default App;

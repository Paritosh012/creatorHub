import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (name && email && password) {
        let res = await api.post("/auth/register", {
          name,
          email,
          password,
        });
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast.success("You are successfully registered");
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1500);
        }
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <Container style={{ maxWidth: 420, paddingTop: 80 }}>
      <Card
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
        }}
      >
        <Card.Body>
          <h3 style={{ color: "#fff", fontWeight: 800, marginBottom: 20 }}>
            Create Account
          </h3>

          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="light"
              style={{ width: "100%", fontWeight: 700 }}
            >
              Sign Up
            </Button>
          </Form>

          <p style={{ marginTop: 16, fontSize: 14, color: "#9ca3af" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;

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
      if (!name || !email || !password) {
        toast.error("All fields are required");
        return;
      }

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("You are successfully registered");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center py-4 py-md-5">
      <Card
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          width: "100%",
          maxWidth: 420,
        }}
      >
        <Card.Body style={{ padding: "26px 22px" }}>
          <h3
            style={{
              color: "#fff",
              fontWeight: 800,
              marginBottom: 18,
              fontSize: 22,
            }}
          >
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
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="light"
              className="w-100"
              style={{
                fontWeight: 700,
                padding: "10px 0",
                borderRadius: 10,
              }}
            >
              Sign Up
            </Button>
          </Form>

          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              color: "#9ca3af",
            }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#06b6d4" }}>
              Login
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;

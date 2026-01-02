import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data.success) { 
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Login successful 🎉");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed ❌");
    }
  };

  return (
    <>
      {" "}
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
              Login
            </h3>

            <Form onSubmit={handleLogin}>
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
                Login
              </Button>
            </Form>

            <p style={{ marginTop: 16, fontSize: 14, color: "#9ca3af" }}>
              Don’t have an account? <Link to="/register">Sign up</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;

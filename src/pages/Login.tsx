import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Card,
  Flex,
  Heading,
  Text,
  TextField,
  Button,
  Callout,
} from "@radix-ui/themes";
import { useAppDispatch } from "../store/hooks";
import { setLoading, loginSuccess, loginFailure } from "../store/authSlice";
import type { User } from "../store/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    dispatch(setLoading(true));

    try {
      // Mock authentication - replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data based on email
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        roles: email.includes("admin")
          ? ["admin", "manager", "user"]
          : email.includes("manager")
          ? ["manager", "user"]
          : ["user"],
      };

      dispatch(loginSuccess(mockUser));
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
      dispatch(loginFailure());
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: "100vh", }}
    >
      <Card style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}>
        <Flex direction="column" gap="4">
          <Heading size="8" align="center">
            Login
          </Heading>
          <Text size="2" color="gray" align="center">
            Welcome back to OKR Dashboard
          </Text>

          {error && (
            <Callout.Root color="red">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
              <label>
                <Text
                  size="2"
                  weight="bold"
                  style={{ display: "block", marginBottom: "0.5rem" }}
                >
                  Email
                </Text>
                <TextField.Root
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label>
                <Text
                  size="2"
                  weight="bold"
                  style={{ display: "block", marginBottom: "0.5rem" }}
                >
                  Password
                </Text>
                <TextField.Root
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <Button type="submit" size="3" style={{ marginTop: "1rem" }}>
                Sign In
              </Button>
            </Flex>
          </form>

          <Flex direction="column" gap="2" style={{ marginTop: "1rem" }}>
            <Text size="2" color="gray" align="center">
              Demo accounts:
            </Text>
            <Text size="1" color="gray" align="center">
              admin@test.com (Admin), manager@test.com (Manager), user@test.com
              (User)
            </Text>
          </Flex>

          <Text size="2" color="gray" align="center">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--accent-11)" }}>
              Register
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}

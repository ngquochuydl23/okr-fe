import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  Flex,
  Heading,
  Text,
  Button,
  Callout,
} from "@radix-ui/themes";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch } from "@/store/hooks";
import { setLoading, loginSuccess, loginFailure } from "@/store/authSlice";
import type { User } from "@/store/authSlice";

export default function Login() {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    setError("");
    dispatch(setLoading(true));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: "1",
        email: "user@gmail.com",
        name: "Demo User",
        roles: ["user"],
      };

      dispatch(loginSuccess(mockUser));
      navigate(from, { replace: true });
    } catch (err) {
      setError("Failed to sign in with Google");
      dispatch(loginFailure());
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}>
        <Flex direction="column" gap="4">
          <Heading size="8" align="center">
            Welcome
          </Heading>
          <Text size="2" color="gray" align="center">
            Sign in to access OKR Dashboard
          </Text>

          {error && (
            <Callout.Root color="red">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <Button
            size="3"
            variant="outline"
            onClick={handleGoogleLogin}
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            <FcGoogle size={20} />
            Sign in with Google
          </Button>

          <Text size="1" color="gray" align="center" style={{ marginTop: "1rem" }}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}

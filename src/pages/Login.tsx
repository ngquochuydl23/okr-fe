import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Callout } from "@radix-ui/themes";
import { FcGoogle } from "react-icons/fc";
import { LayersIcon, BarChartIcon, PersonIcon } from "@radix-ui/react-icons";
import { useAppDispatch } from "@/store/hooks";
import { setLoading, loginSuccess, loginFailure } from "@/store/authSlice";
import type { User } from "@/store/authSlice";
import "./login.scss";

const features = [
  {
    icon: <LayersIcon width={24} height={24} />,
    title: "Strategic Alignment",
    description: "Cascade objectives from company to individual contributors.",
  },
  {
    icon: <BarChartIcon width={24} height={24} />,
    title: "Real-Time Progress",
    description: "Track key results with live dashboards and automated check-ins.",
  },
  {
    icon: <PersonIcon width={24} height={24} />,
    title: "Cross-Team Visibility",
    description: "Foster transparency and accountability across every department.",
  },
];

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLocalLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    setError("");
    setLocalLoading(true);
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
      setError("Failed to sign in with Google. Please try again.");
      dispatch(loginFailure());
      setLocalLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-brand">
        <div className="login-brand__grid" aria-hidden />
        <div className="login-brand__inner">
          <div className="login-brand__logo">
            <span className="login-brand__logo-mark" />
            <span>OKR Platform</span>
          </div>

          <div className="login-brand__hero">
            <h1>Align teams.<br />Drive results.</h1>
            <p>
              The enterprise OKR platform that connects every team to your
              most important company goals.
            </p>
          </div>

          <ul className="login-brand__features">
            {features.map((f) => (
              <li key={f.title}>
                <div className="login-brand__feature-icon">
                  {f.icon}
                </div>
                <div className="login-brand__feature-content">
                  <strong>{f.title}</strong>
                  <p>{f.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="login-brand__proof">
            <div className="login-brand__avatars">
              {["A", "B", "C", "D"].map((l) => (
                <span key={l} className="login-brand__avatar">{l}</span>
              ))}
            </div>
            <p>Trusted by <strong>2,000+</strong> teams worldwide</p>
          </div>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-form-panel__inner">
          <div className="login-form-panel__mobile-logo">
            <span className="login-brand__logo-mark" style={{ background: "var(--accent-9)" }} />
            <span>OKR Platform</span>
          </div>

          <div className="login-form-panel__header">
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.75rem", color: "var(--gray-12)" }}>Welcome back</h2>
            <p style={{ color: "var(--gray-11)", fontSize: "1rem" }}>Please enter your details to sign in.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            <button
              className={`login-google-btn${loading ? " login-google-btn--loading" : ""}`}
              onClick={handleGoogleLogin}
              disabled={loading}
              type="button"
              style={{ justifyContent: "center", width: "100%", height: "48px", fontSize: "1rem", fontWeight: "500" }}
            >
              {loading ? (
                <span className="login-spinner" />
              ) : (
                <FcGoogle size={22} style={{ marginRight: "0.5rem" }} />
              )}
              {loading ? "Signing in..." : "Log in with Google"}
            </button>
            <button className="login-sso-btn" type="button" style={{ display: "none" }}>
              Sign in with SAML SSO
            </button>
          </div>

          <div className="login-divider">
            <span style={{ fontSize: "0.85rem", color: "var(--gray-9)", fontWeight: "500" }}>OR</span>
          </div>

          {error && (
            <Callout.Root color="red" style={{ marginBottom: "1.25rem" }}>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            // Mock email login
            const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
            if (email) alert(`Checking SSO for: ${email}`);
          }}>
            <div className="login-form-group">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label htmlFor="email" style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--gray-12)" }}>Email</label>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your work email"
                style={{ 
                  width: "100%", 
                  height: "48px", 
                  padding: "0 1rem", 
                  borderRadius: "8px", 
                  border: "1px solid var(--gray-6)", 
                  fontSize: "1rem",
                  marginBottom: "0.5rem"
                }}
              />
              <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
                <a href="#" style={{ fontSize: "0.85rem", color: "var(--gray-11)", textDecoration: "none" }}>Forgot password?</a>
              </div>
            </div>
            
            <button 
              className="login-primary-btn"
              type="submit"
              style={{ 
                width: "100%", 
                height: "48px", 
                borderRadius: "8px", 
                backgroundColor: "var(--accent-9)", 
                color: "white", 
                border: "none", 
                fontSize: "1rem", 
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Log in
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ fontSize: "0.95rem", color: "var(--gray-11)" }}>
              Don't have an account?{" "}
              <a href="#" style={{ color: "var(--accent-9)", fontWeight: "600", textDecoration: "none" }}>Sign up</a>
            </p>
          </div>

          <div className="login-security-badge">
            <span>SOC 2 Type II</span>
            <span className="login-security-badge__dot" />
            <span>GDPR Compliant</span>
            <span className="login-security-badge__dot" />
            <span>256-bit TLS</span>
          </div>

          <p className="login-legal">
            By continuing, you agree to our{" "}
            <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>

        <p className="login-copyright">
          &copy; 2026 OKR Platform, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
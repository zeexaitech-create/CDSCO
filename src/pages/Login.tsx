import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Shield, Lock, User, AlertCircle, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, isAuthenticated, DEMO_CREDENTIALS } from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (isAuthenticated()) return <Navigate to="/" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(() => {
      const session = signIn(officerId, password);
      setLoading(false);
      if (!session) {
        setError("Invalid credentials. Officer ID must be at least 4 characters and password at least 6.");
        return;
      }
      navigate("/", { replace: true });
    }, 600);
  };

  const useDemo = () => {
    setOfficerId(DEMO_CREDENTIALS.officerId);
    setPassword(DEMO_CREDENTIALS.password);
    setError(null);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background animate-fade-in-page">
      {/* Left — Institutional panel */}
      <div className="hidden lg:flex flex-col justify-between bg-primary text-primary-foreground p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
             style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />

        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-11 w-11 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center">
              <Building2 className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <div className="font-display text-2xl leading-none">CDSCO RegAI</div>
              <div className="text-[11px] tracking-wider uppercase text-primary-foreground/70 mt-1">
                Powered by IndiaAI
              </div>
            </div>
          </div>
        </div>

        <div className="relative space-y-6 max-w-md">
          <h1 className="font-display text-4xl leading-tight">
            Regulatory Intelligence for India's Healthcare Pipeline
          </h1>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            AI-powered submission review, anonymisation, classification, and
            adverse-event triage — integrated with the SUGAM and MD Online portals.
          </p>

          <div className="space-y-3 pt-4">
            {[
              "DPDP Act 2023 compliant data handling",
              "WHO-UMC causality classification",
              "Audit-grade traceability across modules",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary-foreground/90 shrink-0" strokeWidth={2} />
                <span className="text-primary-foreground/85">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-[11px] text-primary-foreground/60 space-y-1">
          <div>Ministry of Health and Family Welfare</div>
          <div>Government of India</div>
        </div>
      </div>

      {/* Right — Login form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
              <Building2 className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <div className="font-display text-xl leading-none">CDSCO RegAI</div>
              <div className="text-[10px] tracking-wider uppercase text-muted-foreground mt-1">Powered by IndiaAI</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent-blue-light text-primary text-[11px] font-medium mb-4">
              <Shield className="h-3 w-3" strokeWidth={2.25} />
              Secure Officer Sign-in
            </div>
            <h2 className="font-display text-3xl text-foreground">Sign in to continue</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Authorised personnel only. All access is logged for audit and compliance review.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="officerId" className="text-foreground">Officer ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                <Input
                  id="officerId"
                  type="text"
                  autoComplete="username"
                  placeholder="e.g. DC-OFFICER-001"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  className="pl-9 font-mono-code text-sm tracking-wide"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => setError("Password recovery is handled by your departmental IT administrator.")}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-destructive-light border border-destructive/20 text-destructive text-xs">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full h-11">
              {loading ? "Verifying credentials…" : "Sign in securely"}
            </Button>

            <button
              type="button"
              onClick={useDemo}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Use demo officer credentials
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
              <Shield className="h-3.5 w-3.5 mt-0.5 shrink-0 text-text-muted" strokeWidth={1.75} />
              <p>
                For Official Use Only. Unauthorised access to this system is a
                punishable offence under the Information Technology Act, 2000.
                System time: <span className="font-mono-code">{now.toLocaleTimeString("en-IN", { hour12: false })} IST</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

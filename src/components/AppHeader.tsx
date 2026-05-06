import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StatusPill } from "./StatusPill";
import { User, Clock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession, signOut } from "@/lib/auth";

export function AppHeader({ title }: { title: string }) {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  const initials = session?.name
    ? session.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()
    : "DC";

  return (
    <header className="h-14 bg-bg-surface border-b border-border flex items-center justify-between px-6 shrink-0">
      <h2 className="font-display text-xl text-foreground">{title}</h2>
      <div className="flex items-center gap-4">
        <StatusPill status="Demo" pulse />
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Clock className="h-3.5 w-3.5" />
          {time.toLocaleTimeString("en-IN", { hour12: false })}
        </div>
        <div className="flex items-center gap-2.5 text-sm text-text-secondary pl-3 border-l border-border">
          <div className="h-7 w-7 rounded-full bg-accent-blue-light text-primary flex items-center justify-center text-[11px] font-semibold">
            {initials}
          </div>
          <div className="leading-tight">
            <div className="text-foreground text-xs font-medium">{session?.name ?? "DC Officer"}</div>
            <div className="text-[10px] text-text-muted font-mono-code">{session?.officerId ?? "—"}</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-text-secondary hover:text-foreground">
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </Button>
      </div>
    </header>
  );
}

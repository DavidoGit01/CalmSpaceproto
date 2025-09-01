// src/components/AuthGate.tsx
import { ReactNode, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthGate({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/login");
      } else {
        setSession(data.session);
      }
      setLoading(false);
    };
    getSession();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  return session ? <>{children}</> : null;
}

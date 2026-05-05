"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearIsAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else {
          clearAuth();
          router.push("/sign-in");
        }
      } catch {
        clearAuth();
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearAuth, router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}

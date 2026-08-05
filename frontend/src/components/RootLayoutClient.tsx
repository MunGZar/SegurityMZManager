'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from "@/components/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <AuthProvider>
      {isLoginPage ? (
        <div className="min-h-screen w-full bg-slate-950 text-white">
          {children}
        </div>
      ) : (
        <AuthGuard>
          <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <Sidebar />
            <div className="pl-64 min-h-screen flex flex-col bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
              <main className="flex-1 p-8">
                {children}
              </main>
            </div>
          </div>
        </AuthGuard>
      )}
    </AuthProvider>
  );
}

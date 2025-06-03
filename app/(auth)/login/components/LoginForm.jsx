"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth-actions";

export function LoginForm() {
  const [state, formAction] = useActionState(login, null);

  useEffect(() => {
    if (!state) return;

    if (state.error) {
      toast.error(state.message);
    } else {
      toast.success("Login berhasil!");
      window.location.reload();
    }
  }, [state]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Navigation Back Button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Masuk</CardTitle>
          <CardDescription>
            Masukkan email dan password Anda untuk masuk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                required
                autoComplete="username"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••••"
                required
                minLength={6}
                autoComplete="current-password"
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/signup" className="underline text-primary hover:text-primary/80">
              Daftar sekarang
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
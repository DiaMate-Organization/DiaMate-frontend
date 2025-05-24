"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

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

    // console.log('Login state:', state); // Debugging

    if (state.error) {
      toast.error(state.message);
    } else {
      toast.success("Login berhasil!");
      window.location.reload();
    }
  }, [state]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Masuk</CardTitle>
        <CardDescription>
          Masukkan email dan password Anda untuk masuk
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                required
                autoComplete="username"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••••"
                required
                minLength={6}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <Link href="/signup" className="underline">
            Daftar sekarang
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

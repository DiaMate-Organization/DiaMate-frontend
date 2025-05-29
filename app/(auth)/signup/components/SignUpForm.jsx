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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/auth-actions";

export function SignUpForm() {
  const [state, formAction] = useActionState(register, null);

  useEffect(() => {
    if (!state) return;

    if (state.error) {
      toast.error(state.message);
    } else {
      toast.success(state.message);
      window.location.reload();
      window.location.href = "/login";
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
          <CardTitle className="text-xl font-bold">Daftar Akun</CardTitle>
          <CardDescription>
            Masukkan informasi Anda untuk membuat akun baru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {/* Name Fields - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">Nama Depan</Label>
                <Input
                  name="first-name"
                  id="first-name"
                  placeholder="John"
                  required
                  minLength={2}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Nama Belakang</Label>
                <Input
                  name="last-name"
                  id="last-name"
                  placeholder="Doe"
                  required
                  minLength={2}
                  className="w-full"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                required
                className="w-full"
              />
            </div>

            {/* Password Fields */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="••••••••••"
                required
                minLength={6}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Konfirmasi Password</Label>
              <Input
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••••"
                type="password"
                required
                className="w-full"
              />
            </div>

            {/* Age and Gender - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Umur</Label>
                <Input
                  name="age"
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="20"
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Jenis Kelamin</Label>
                <Select name="gender" required>
                  <SelectTrigger id="gender" className="w-full">
                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki Laki">Laki Laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Buat Akun
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="underline text-primary hover:text-primary/80">
              Masuk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
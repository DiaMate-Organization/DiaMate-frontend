'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [state, formAction] = useActionState(register, null);

  useEffect(() => {
    if (!state) return;
    
    if (state.error) {
      toast.error(state.message);
    } else {
      toast.success(state.message);
      router.push('/login');
    }
  }, [state, router]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Daftar Akun</CardTitle>
        <CardDescription>
          Masukkan informasi Anda untuk membuat akun baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Nama Depan</Label>
                <Input
                  name="first-name"
                  id="first-name"
                  placeholder="John"
                  required
                  minLength={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Nama Belakang</Label>
                <Input
                  name="last-name"
                  id="last-name"
                  placeholder="Doe"
                  required
                  minLength={2}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                required
                minLength={6}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Konfirmasi Password</Label>
              <Input
                name="confirm-password"
                id="confirm-password"
                type="password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Umur</Label>
              <Input 
                name="age" 
                id="age" 
                type="number" 
                min="1" 
                max="120" 
                required 
              />
            </div>
            <div className="grid gap-2">
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
            <Button type="submit" className="w-full">
              Buat Akun
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <Link href="/login" className="underline">
            Masuk
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { getProfile } from '@/lib/auth-actions';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { logout } from '@/lib/auth-actions';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const { error, user } = await getProfile();
      if (error) {
        toast.error('Gagal memuat profil');
        router.push('/login');
      } else {
        setUser(user);
      }
    };
    
    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return <div>Memuat...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profil Pengguna</h1>
      <div className="space-y-2">
        <p><span className="font-semibold">Nama Lengkap:</span> {user.fullname}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Umur:</span> {user.age}</p>
        <p><span className="font-semibold">Jenis Kelamin:</span> {user.gender}</p>
      </div>
      <Button onClick={handleLogout} className="mt-6">
        Keluar
      </Button>
    </div>
  );
}
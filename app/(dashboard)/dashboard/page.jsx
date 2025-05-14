"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/auth-actions";
import RecomendationCard from "@/components/RecomendationCard";
import SummaryRiskCard from "@/components/SummaryRiskCard";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();

      if (result.error) {
        console.error("Gagal ambil profil:", result.message);
        setUserData(null);
      } else {
        setUserData(result.user);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!userData) return <p className="p-4 text-red-500">User tidak ditemukan.</p>;

  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-primary">
          Selamat Datang, {userData.fullname}
        </h2>
        <p className="text-muted-foreground">
          Pantau dan kelola risiko diabetes Anda dengan mudah
        </p>
      </div>

      <SummaryRiskCard userData={userData} />
      <RecomendationCard recommendations={userData.recommendations} />
    </main>
  );
};

export default DashboardPage;

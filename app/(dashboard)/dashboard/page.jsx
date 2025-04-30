"use client";

import { useEffect, useState } from "react";
import RecomendationCard from "@/components/RecomendationCard";
import SummaryRiskCard from "@/components/SummaryRiskCard";
import LoginButton from "@/components/LoginLogoutButton";
import { createClient } from "@/utils/supabase/client";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Gagal ambil user:", userError);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Gagal ambil data profil:", error);
      } else {
        setUserData(data);
      }

      setLoading(false);
    };

    fetchUserData();

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }
    checkUser()

  }, []);


  if (loading) return <p className="p-4">Loading...</p>;
  if (!userData) return <p className="p-4 text-red-500">User tidak ditemukan.</p>;

  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-primary">
          Selamat Datang, {userData.full_name}
        </h2>
        <LoginButton />
  
        <p className="text-muted-foreground">
          Pantau dan kelola risiko diabetes Anda dengan mudah
        </p>
      </div>

      <SummaryRiskCard userData={userData} />
      <RecomendationCard recommendations={[userData.recommendations]} />
    </main>
  );
};

export default DashboardPage;

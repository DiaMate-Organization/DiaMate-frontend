import SummaryRiskCard from "@/components/SummaryRiskCard";

const mockUserData = {
  name: "Bobon Santoso",
  riskLevel: "Rendah",
  lastCheckup: "15 April 2024",
  bmi: 26.4,
  bloodPressure: "130/85",
  bloodSugar: "110 mg/dL",
  physicalActivity: "2x seminggu",

};

const DashboardPage = () => {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-primary">
          Selamat Datang, Paiss
        </h2>
        <p className="text-muted-foreground">
          Pantau dan kelola risiko diabetes Anda dengan mudah
        </p>
      </div>

      <SummaryRiskCard userData={mockUserData} />

    </main>
  );
};

export default DashboardPage;

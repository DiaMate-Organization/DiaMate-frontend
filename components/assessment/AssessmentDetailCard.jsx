import { Skeleton } from "@/components/ui/skeleton";

export default function AssessmentDetailCard({ assessment, loading }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-4 rounded-lg border border-border">
          <Skeleton className="h-6 w-32 mb-2 bg-muted" />
          <Skeleton className="h-4 w-24 mb-2 bg-muted" />
          <Skeleton className="h-4 w-48 bg-muted" />
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <Skeleton className="h-6 w-32 mb-2 bg-muted" />
          <Skeleton className="h-4 w-48 bg-muted" />
        </div>
      </div>
    );
  }

  const riskMessage = {
    Rendah: "Tidak ada tanda-tanda signifikan diabetes. Tetap jaga pola makan sehat.",
    Sedang: "Terdapat risiko sedang. Konsultasikan dengan dokter untuk pemeriksaan lebih lanjut.",
    Tinggi: "Risiko tinggi terdeteksi. Segera konsultasi dengan dokter spesialis.",
  }[assessment.risk_level] || "Informasi risiko tidak tersedia.";

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Ringkasan</h3>
          <p className="text-sm text-muted-foreground">
            <strong>Tingkat Risiko:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 text-xs font-medium text-white rounded-md ${
                assessment.risk_level === "Rendah"
                  ? "bg-green-500"
                  : assessment.risk_level === "Sedang"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {assessment.risk_level}
            </span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">{riskMessage}</p>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Faktor Risiko</h3>
          {assessment.risk_factors.length > 0 ? (
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {assessment.risk_factors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tidak ada faktor risiko signifikan.
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 bg-card p-4 rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          Detail Kesehatan
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <p>
            <strong>Usia:</strong> {assessment.input_features.Age}
          </p>
          <p>
            <strong>BMI:</strong> {assessment.input_features.BMI}
          </p>
          <p>
            <strong>Jenis Kelamin:</strong>{" "}
            {assessment.input_features.Sex ? "Laki-laki" : "Perempuan"}
          </p>
          <p>
            <strong>Tekanan Darah Tinggi:</strong>{" "}
            {assessment.input_features.HighBP ? "Ya" : "Tidak"}
          </p>
          <p>
            <strong>Pendapatan:</strong> {assessment.input_features.Income}
          </p>
          <p>
            <strong>Riwayat Stroke:</strong>{" "}
            {assessment.input_features.Stroke ? "Ya" : "Tidak"}
          </p>
          <p>
            <strong>Kesehatan Umum:</strong> {assessment.input_features.GenHlth}
          </p>
          <p>
            <strong>Kesulitan Berjalan:</strong>{" "}
            {assessment.input_features.DiffWalk ? "Ya" : "Tidak"}
          </p>
          <p>
            <strong>Kolesterol Tinggi:</strong>{" "}
            {assessment.input_features.HighChol ? "Ya" : "Tidak"}
          </p>
          <p>
            <strong>Kesehatan Fisik:</strong> {assessment.input_features.PhysHlth}{" "}
            hari
          </p>
          <p>
            <strong>Pendidikan:</strong> {assessment.input_features.Education}
          </p>
          <p>
            <strong>Aktivitas Fisik:</strong>{" "}
            {assessment.input_features.PhysActivity ? "Ya" : "Tidak"}
          </p>
          <p>
            <strong>Akses Kesehatan:</strong>{" "}
            {assessment.input_features.AnyHealthcare ? "Ya" : "Tidak"}
          </p>
          <p>
            <strong>Konsumsi Alkohol Berat:</strong>{" "}
            {assessment.input_features.HvyAlcoholConsump ? "Ya" : "Tidak"}
          </p>
          <p>
            <strong>Penyakit Jantung:</strong>{" "}
            {assessment.input_features.HeartDiseaseorAttack ? "Ya" : "Tidak"}
          </p>
        </div>
      </div>
    </>
  );
}
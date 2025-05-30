'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { createAssessment } from '@/lib/assessment-actions';
import { assessmentSchema } from '@/lib/assessment-validation';

export function AssessmentForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    HighBP: '0',
    HighChol: '0',
    Weight: '',
    Height: '',
    Stroke: '0',
    HeartDiseaseorAttack: '0',
    PhysActivity: '1',
    HvyAlcoholConsump: '0',
    AnyHealthcare: '1',
    GenHlth: '3',
    PhysHlth: '0',
    DiffWalk: '0',
    Sex: '0',
    Age: '1',
    Education: '4',
    Income: '4',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const weight = parseFloat(formData.Weight);
    const height = parseFloat(formData.Height) / 100;
    const BMI = weight && height ? Math.round(weight / (height * height)) : NaN;

    const payload = {
      HighBP: parseInt(formData.HighBP),
      HighChol: parseInt(formData.HighChol),
      BMI,
      Stroke: parseInt(formData.Stroke),
      HeartDiseaseorAttack: parseInt(formData.HeartDiseaseorAttack),
      PhysActivity: parseInt(formData.PhysActivity),
      HvyAlcoholConsump: parseInt(formData.HvyAlcoholConsump),
      AnyHealthcare: parseInt(formData.AnyHealthcare),
      GenHlth: parseInt(formData.GenHlth),
      PhysHlth: parseInt(formData.PhysHlth),
      DiffWalk: parseInt(formData.DiffWalk),
      Sex: parseInt(formData.Sex),
      Age: parseInt(formData.Age),
      Education: parseInt(formData.Education),
      Income: parseInt(formData.Income),
    };

    const { error } = assessmentSchema.validate(payload, { abortEarly: false });
    const newErrors = {};
    if (error) {
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
    }
    if (isNaN(weight) || weight <= 0) {
      newErrors.Weight = 'Berat badan harus berupa angka lebih dari 0';
    }
    if (isNaN(height) || height <= 0) {
      newErrors.Height = 'Tinggi badan harus berupa angka lebih dari 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast.error('Periksa kembali input Anda, ada data yang belum valid.');
      return;
    }

    try {
      const response = await createAssessment(payload);
      if (response.error) {
        toast.error(response.message);
      } else {
        const result = {
          risk: response.data.data.risk_level,
          probability:
            response.data.data.risk_level === 'Rendah'
              ? 0.2
              : response.data.data.risk_level === 'Sedang'
              ? 0.5
              : 0.8,
          riskFactors: response.data.data.risk_factors || [],
          timestamp: response.data.data.created_at,
        };
        onSuccess(result);
        toast.success(`Penilaian berhasil!`);
        const id = response.data.data.id;
        window.location.href= `/dashboard/riwayat/detail/${id}`

      }
    } catch (err) {
      toast.error('Terjadi kesalahan saat memproses penilaian.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const YesNoRadioGroup = ({ name, label, value, error }) => (
    <div className="space-y-4">
      <Label htmlFor={name} className="text-foreground">
        {label}
      </Label>
      <RadioGroup
        name={name}
        value={value}
        onValueChange={(val) => handleChange(name, val)}
        className="flex items-center space-x-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1" id={`${name}-yes`} />
          <Label htmlFor={`${name}-yes`}>Ya</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="0" id={`${name}-no`} />
          <Label htmlFor={`${name}-no`}>Tidak</Label>
        </div>
      </RadioGroup>
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <Card className="w-full bg-card border-border">
      <CardHeader>
        <CardTitle>Formulir Penilaian Risiko Diabetes</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Kondisi Kesehatan</h3>
            <YesNoRadioGroup
              name="HighBP"
              label="Apakah Anda memiliki tekanan darah tinggi?"
              value={formData.HighBP}
              error={errors.HighBP}
            />
            <YesNoRadioGroup
              name="HighChol"
              label="Apakah Anda memiliki kadar kolesterol tinggi?"
              value={formData.HighChol}
              error={errors.HighChol}
            />
            <YesNoRadioGroup
              name="Stroke"
              label="Apakah Anda pernah mengalami stroke?"
              value={formData.Stroke}
              error={errors.Stroke}
            />
            <YesNoRadioGroup
              name="HeartDiseaseorAttack"
              label="Apakah Anda memiliki penyakit jantung atau riwayat serangan jantung?"
              value={formData.HeartDiseaseorAttack}
              error={errors.HeartDiseaseorAttack}
            />
          </div>

          <Separator orientation="horizontal" className="my-2 md:col-span-2" />

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Gaya Hidup dan Kesehatan Fisik</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label htmlFor="Weight" className="text-foreground">
                  Berat Badan (kg)
                </Label>
                <Input
                  type="number"
                  id="Weight"
                  name="Weight"
                  value={formData.Weight}
                  onChange={(e) => handleChange('Weight', e.target.value)}
                  min="0"
                  step="0.1"
                  placeholder="Contoh: 70.5"
                  required
                  className="bg-muted text-foreground border-border"
                />
                {errors.Weight && (
                  <p className="text-destructive text-sm">{errors.Weight}</p>
                )}
              </div>
              <div className="space-y-4">
                <Label htmlFor="Height" className="text-foreground">
                  Tinggi Badan (cm)
                </Label>
                <Input
                  type="number"
                  id="Height"
                  name="Height"
                  value={formData.Height}
                  onChange={(e) => handleChange('Height', e.target.value)}
                  min="0"
                  step="0.1"
                  placeholder="Contoh: 165"
                  required
                  className="bg-muted text-foreground border-border"
                />
                {errors.Height && (
                  <p className="text-destructive text-sm">{errors.Height}</p>
                )}
              </div>
            </div>
            <YesNoRadioGroup
              name="PhysActivity"
              label="Aktivitas fisik dalam 30 hari terakhir (selain pekerjaan)?"
              value={formData.PhysActivity}
              error={errors.PhysActivity}
            />
            <YesNoRadioGroup
              name="HvyAlcoholConsump"
              label="Termasuk peminum alkohol berat? (Pria: >14 minuman/minggu, Wanita: >7 minuman/minggu)"
              value={formData.HvyAlcoholConsump}
              error={errors.HvyAlcoholConsump}
            />
            <YesNoRadioGroup
              name="AnyHealthcare"
              label="Apakah Anda memiliki asuransi kesehatan?"
              value={formData.AnyHealthcare}
              error={errors.AnyHealthcare}
            />
            <YesNoRadioGroup
              name="DiffWalk"
              label="Apakah Anda kesulitan serius saat berjalan atau menaiki tangga?"
              value={formData.DiffWalk}
              error={errors.DiffWalk}
            />
          </div>

          <Separator orientation="horizontal" className="my-2 md:col-span-2" />

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Kesehatan Umum dan Demografi</h3>
            <div className="space-y-4">
              <Label htmlFor="GenHlth" className="text-foreground">
                Kondisi kesehatan umum Anda?
              </Label>
              <Select
                name="GenHlth"
                value={formData.GenHlth}
                onValueChange={(value) => handleChange('GenHlth', value)}
                required
              >
                <SelectTrigger className="bg-muted text-foreground border-border">
                  <SelectValue placeholder="Pilih penilaian" />
                </SelectTrigger>
                <SelectContent className="bg-muted text-foreground border-border">
                  <SelectItem value="1">Sangat Baik</SelectItem>
                  <SelectItem value="2">Baik</SelectItem>
                  <SelectItem value="3">Cukup</SelectItem>
                  <SelectItem value="4">Kurang Baik</SelectItem>
                  <SelectItem value="5">Buruk</SelectItem>
                </SelectContent>
              </Select>
              {errors.GenHlth && (
                <p className="text-destructive text-sm">{errors.GenHlth}</p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor="PhysHlth" className="text-foreground">
                Dalam 30 hari terakhir, berapa hari kesehatan fisik Anda tidak baik?
              </Label>
              <Input
                type="number"
                id="PhysHlth"
                name="PhysHlth"
                value={formData.PhysHlth}
                onChange={(e) => handleChange('PhysHlth', e.target.value)}
                min="0"
                max="30"
                placeholder="0-30 hari"
                required
                className="bg-muted text-foreground border-border"
              />
              {errors.PhysHlth && (
                <p className="text-destructive text-sm">{errors.PhysHlth}</p>
              )}
            </div>
            <div className="space-y-4">
              <Label className="text-foreground">Jenis Kelamin</Label>
              <RadioGroup
                name="Sex"
                value={formData.Sex}
                onValueChange={(val) => handleChange('Sex', val)}
                className="flex items-center space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="sex-male" />
                  <Label htmlFor="sex-male">Laki-laki</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="sex-female" />
                  <Label htmlFor="sex-female">Perempuan</Label>
                </div>
              </RadioGroup>
              {errors.Sex && <p className="text-destructive text-sm mt-1">{errors.Sex}</p>}
            </div>
            <div className="space-y-4">
              <Label htmlFor="Age" className="text-foreground">
                Kelompok usia Anda?
              </Label>
              <Select
                name="Age"
                value={formData.Age}
                onValueChange={(value) => handleChange('Age', value)}
                required
              >
                <SelectTrigger className="bg-muted text-foreground border-border">
                  <SelectValue placeholder="Pilih kelompok usia" />
                </SelectTrigger>
                <SelectContent className="bg-muted text-foreground border-border">
                  <SelectItem value="1">18–24</SelectItem>
                  <SelectItem value="2">25–29</SelectItem>
                  <SelectItem value="3">30–34</SelectItem>
                  <SelectItem value="4">35–39</SelectItem>
                  <SelectItem value="5">40–44</SelectItem>
                  <SelectItem value="6">45–49</SelectItem>
                  <SelectItem value="7">50–54</SelectItem>
                  <SelectItem value="8">55–59</SelectItem>
                  <SelectItem value="9">60–64</SelectItem>
                  <SelectItem value="10">65–69</SelectItem>
                  <SelectItem value="11">70–74</SelectItem>
                  <SelectItem value="12">75–79</SelectItem>
                  <SelectItem value="13">80+</SelectItem>
                </SelectContent>
              </Select>
              {errors.Age && <p className="text-destructive text-sm">{errors.Age}</p>}
            </div>
          </div>

          <Separator orientation="horizontal" className="my-2 md:col-span-2" />

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Pendidikan dan Pendapatan</h3>
            <div className="space-y-4">
              <Label htmlFor="Education" className="text-foreground">
                Tingkat pendidikan terakhir Anda?
              </Label>
              <Select
                name="Education"
                value={formData.Education}
                onValueChange={(value) => handleChange('Education', value)}
                required
              >
                <SelectTrigger className="bg-muted text-foreground border-border">
                  <SelectValue placeholder="Pilih tingkat pendidikan" />
                </SelectTrigger>
                <SelectContent className="bg-muted text-foreground border-border">
                  <SelectItem value="1">Tidak Sekolah</SelectItem>
                  <SelectItem value="2">SD</SelectItem>
                  <SelectItem value="3">SMP</SelectItem>
                  <SelectItem value="4">SMA / Sederajat</SelectItem>
                  <SelectItem value="5">Diploma / Akademi</SelectItem>
                  <SelectItem value="6">Sarjana (S1) / Lebih Tinggi</SelectItem>
                </SelectContent>
              </Select>
              {errors.Education && (
                <p className="text-destructive text-sm">{errors.Education}</p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor="Income" className="text-foreground">
                Tingkat pendapatan Anda?
              </Label>
              <Select
                name="Income"
                value={formData.Income}
                onValueChange={(value) => handleChange('Income', value)}
                required
              >
                <SelectTrigger className="bg-muted text-foreground border-border">
                  <SelectValue placeholder="Pilih tingkat pendapatan" />
                </SelectTrigger>
                <SelectContent className="bg-muted text-foreground border-border">
                  <SelectItem value="1">Kurang dari 15 Juta/tahun</SelectItem>
                  <SelectItem value="2">15 - 25 Juta/tahun</SelectItem>
                  <SelectItem value="3">25 - 35 Juta/tahun</SelectItem>
                  <SelectItem value="4">35 - 50 Juta/tahun</SelectItem>
                  <SelectItem value="5">50 - 75 Juta/tahun</SelectItem>
                  <SelectItem value="6">75 - 100 Juta/tahun</SelectItem>
                  <SelectItem value="7">100 - 200 Juta/tahun</SelectItem>
                  <SelectItem value="8">Lebih dari 200 Juta/tahun</SelectItem>
                </SelectContent>
              </Select>
              {errors.Income && (
                <p className="text-destructive text-sm">{errors.Income}</p>
              )}
            </div>
          </div>

          <Separator orientation="horizontal" className="my-2 md:col-span-2" />

          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
            >
              {isSubmitting ? 'Mengirim...' : 'Dapatkan Hasil Penilaian'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
# BRT Bandung Web Guide

Panduan interaktif visualisasi rute dan halte Bus Rapid Transit (BRT) di Bandung Raya. Proyek ini dibangun menggunakan [Astro](https://astro.build/) dan [Leaflet](https://leafletjs.com/) untuk memberikan gambaran mudah dari dokumen teknis yang kompleks.

## 🚀 Fitur Utama

- **Peta Interaktif**: Visualisasi lokasi halte BRT berdasarkan data resmi dan pemetaan komunitas.
- **Data LARAP (Surveyed)**: Menampilkan 39 titik halte prioritas dari dokumen *Supplementary LARAP Dec 2025*, lengkap dengan foto survei lapangan.
- **Social Impact Analysis**: Detail aset yang terdampak di setiap titik (PKL, pohon, utilitas) yang disajikan dalam bentuk label kapsul yang mudah dibaca.
- **Approximate Mapping**: Mencakup 100+ titik halte tambahan (BRT 10, 03A, 03B) berdasarkan diagram rute untuk memberikan gambaran jaringan yang lebih utuh.
- **Hide/Show Features**: Fokus pada data halte dengan kemampuan menyembunyikan elemen rute yang masih dalam tahap draf.

## 📁 Struktur Proyek

```text
/
├── public/
│   ├── docs/              # Dokumen sumber (LARAP PDF & Mapping TXT)
│   ├── survey_picture/    # Foto asli kondisi lapangan halte
│   └── shelter_design/    # Ilustrasi desain tipe-tipe halte
├── src/
│   ├── components/        # Komponen UI (Map.astro)
│   ├── data/             # Database JSON (shelters.json, routes.json)
│   ├── pages/            # Entry point aplikasi
│   └── styles/           # Styling Tailwind & Custom CSS
└── package.json
```

## 🛠️ Pengembangan

Proyek ini menggunakan [Bun](https://bun.sh/) sebagai package manager.

| Perintah              | Aksi                                             |
| :-------------------- | :----------------------------------------------- |
| `bun install`         | Menginstal dependensi                            |
| `bun dev`             | Menjalankan server pengembangan                  |
| `bun build`           | Membuat build produksi                           |

## 📝 Sumber Data

1.  **LARAP Dec 2025**: Data primer untuk koordinat presisi, foto survei, dan dampak sosial.
2.  **Community Mapping**: Estimasi posisi halte berdasarkan diagram rute lampiran dokumen teknis.

## 💬 Feedback

Kami sangat menghargai masukan, koreksi koordinat, atau saran fitur. Silakan sampaikan melalui [GitHub Issues](https://github.com/FakhriF/brt-bandung-web-guide/issues).

---
Dikembangkan untuk membantu warga Bandung memahami rencana transportasi masa depan kota. 🚌✨

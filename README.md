# BRT Bandung Web Guide

Panduan interaktif rute dan halte Bus Rapid Transit (BRT) di Bandung. Proyek ini dibangun menggunakan [Astro](https://astro.build/) untuk performa yang optimal dan kemudahan pengembangan.

## 🚀 Fitur Utama

- **Peta Interaktif**: Visualisasi rute dan lokasi halte BRT di Bandung.
- **Data Halte**: Informasi lengkap mengenai halte-halte yang tersedia (disimpan dalam format JSON).
- **Galeri Survei**: Foto-foto kondisi halte hasil survei lapangan.
- **Desain Responsif**: Nyaman diakses melalui perangkat desktop maupun mobile.

## 📁 Struktur Proyek

```text
/
├── public/
│   └── survey_picture/    # Foto-foto hasil survei halte
├── src/
│   ├── components/        # Komponen Astro (seperti Map.astro)
│   ├── data/             # Data halte (shelters.json)
│   ├── layouts/          # Tata letak halaman (Layout.astro)
│   ├── pages/            # Halaman utama (index.astro)
│   └── styles/           # File CSS global
└── package.json
```

## 🛠️ Pengembangan

Proyek ini menggunakan [Bun](https://bun.sh/) sebagai package manager.

| Perintah              | Aksi                                             |
| :-------------------- | :----------------------------------------------- |
| `bun install`         | Menginstal dependensi                            |
| `bun dev`             | Menjalankan server pengembangan di `localhost:4321` |
| `bun build`           | Membuat build produksi di folder `./dist/`       |
| `bun preview`         | Melakukan preview hasil build secara lokal       |

## 📝 Catatan Tambahan

Data halte saat ini mencakup 39 lokasi survei dengan koordinat GPS dan foto-foto pendukung. Silakan periksa `src/data/shelters.json` untuk detail teknis data.

---
Dikembangkan dengan ❤️ untuk Bandung yang lebih baik.

# Smart Santri — Web Apps SD/MI

Trial aplikasi sekolah berbahasa Indonesia untuk **GitHub Pages**. HTML, CSS, dan JavaScript tanpa framework atau layanan eksternal. Tidak membutuhkan `npm install`.

Repositori: [hdrgcreativepartner-del/smartsantri](https://github.com/hdrgcreativepartner-del/smartsantri). Alamat trial setelah deployment berhasil: [Smart Santri](https://hdrgcreativepartner-del.github.io/smartsantri/).

## Fitur

- Landing page responsif.
- Absensi ID siswa/guru dengan pop-up identitas, kelas, tanggal, jam WIB; pencegahan catatan ganda per hari; rekap dan ekspor CSV.
- Ruang belajar per kelas; materi teks/lampiran dan pengaturan tombol unduh.
- Tugas seperti formulir: pilihan ganda, benar/salah, jawaban singkat, kunci jawaban, bobot, batas waktu opsional, dan nilai otomatis. Maksimal 50 soal per tugas.
- Hasil siswa, rincian jawaban, ekspor nilai; tugas yang sudah dikumpulkan dikunci agar nilai tetap utuh.
- Portal ekstrakurikuler, pembina, keanggotaan siswa, jadwal, dan materi.
- Berita, papan informasi, dan siswa berprestasi yang dikelola admin.
- Admin mengelola kelas, mapel, akun/ID, peran, serta penugasan guru dan pembina.

## Akun demo

| ID | Peran | Akses contoh |
|---|---|---|
| `ADMIN001` | Admin | Seluruh sekolah |
| `GURU001` | Ibu Salma, guru | IV A, Matematika/Bahasa Indonesia, pembina Pramuka |
| `GURU002` | Bapak Yusuf, guru | V A, Matematika/PAI |
| `ESKUL001` | Ustazah Nisa, pembina | Tahfidz |
| `SISWA001` | Alya Rahma, siswa | IV A, Tahfidz dan Pramuka |
| `SISWA002` | Rafi Ahmad, siswa | IV A, Pramuka |
| `SISWA003` | Naufal Hakim, siswa | V A, Tahfidz |

Semua identitas dan isi awal adalah data contoh. Ilustrasi siswa dibuat dengan AI.

## Batas trial

**Data disimpan pada IndexedDB browser ini; antarperangkat belum sinkron.** Untuk mencoba alur guru dan siswa, gunakan browser yang sama dan berganti akun lewat tombol Keluar. Kabar sekolah pada trial juga berasal dari data browser masing-masing, belum dari database publik bersama.

Login ID saja digunakan untuk simulasi peran, bukan pengamanan operasional. Kunci jawaban, nilai, dan aturan peran ada di browser dan dapat dimanipulasi melalui perangkat pengguna. Jangan masukkan data siswa atau kata sandi sungguhan.

Pengaturan tidak dapat diunduh menonaktifkan tombol unduh; konten yang tampil tetap dapat disalin, ditangkap layar, atau disimpan melalui browser. Ini bukan DRM.

Waktu absensi mengikuti jam perangkat dan ditampilkan dalam `Asia/Jakarta`. Tidak ada verifikasi lokasi/identitas atau jam server. Menghapus data situs menghapus data dan lampiran trial; mode privat bisa menghapusnya saat ditutup. Memindah domain membuat origin/penyimpanan baru.

Lampiran mendukung PDF, JPG, PNG, WebP, dan TXT, maksimal 5 MB. Penampil PDF tertanam bergantung dukungan browser ponsel.

Lihat [PANDUAN.md](PANDUAN.md) untuk langkah mencoba dan [PRODUKSI.md](PRODUKSI.md) untuk kebutuhan backend sebelum digunakan sungguhan.

## Menjalankan lokal

Pasang Node.js 20 atau lebih baru, lalu jalankan di folder proyek:

```sh
npm start
```

Buka localhost pada port 4173. `server.cjs` hanya menyajikan berkas lokal; bukan backend aplikasi.

## Publikasi GitHub Pages

1. Gunakan repositori `hdrgcreativepartner-del/smartsantri`.
2. Unggah isi proyek ini; pertahankan folder `dist` dan `.github/workflows`.
3. Di **Settings → Pages → Build and deployment**, pilih sumber **GitHub Actions**.
4. Push ke branch `main` memicu deployment. Untuk menjalankannya ulang, di **Actions → Deploy Smart Santri to GitHub Pages**, pilih **Run workflow**.
5. Setelah sukses, buka URL dari hasil workflow.

Workflow dipicu push ke `main` atau secara manual, menjalankan pemeriksaan dan tes, lalu menerbitkan hanya folder `dist`. Semua tautan aset memakai path relatif agar cocok untuk subpath repositori. Workflow tidak mengubah visibilitas repo, membeli hosting/domain, atau menanam token dalam kode browser.

Alternatif tanpa Actions: salin isi `dist` ke root branch Pages dan pilih **Deploy from a branch** beserta root folder pada Settings → Pages. Pilih salah satu metode publikasi.

## Struktur

- `dist/index.html`, `styles.css`, `app.js`: landing page.
- `dist/portal.html`, `portal.css`, `portal.js`: web app, navigasi, formulir, dan interaksi.
- `dist/store.js`: model data, validasi, aturan peran trial, dan akses IndexedDB.
- `dist/assets/`, `fonts.css`: aset dan font lokal.
- `.github/workflows/pages.yml`: workflow GitHub Pages.
- `server.cjs`: server pengembangan tanpa dependensi.
- `tests/model.test.cjs`: 15 tes logika utama.

## Verifikasi

```sh
npm run check
npm test
```

Tes mencakup peran, penugasan kelas/mapel, keanggotaan eskul, absensi ganda dan WIB, penilaian berbobot, pengumpulan ganda, batas waktu, penguncian kunci jawaban, validasi berkas, dan rollback penyimpanan. Pembatasan model ini adalah perilaku trial, bukan pengganti keamanan server.

Font DM Sans dari Google Fonts memakai SIL Open Font License; lisensi disertakan di `dist/assets/DM-Sans-OFL.txt`. Semua aset dimuat lokal setelah diterbitkan.

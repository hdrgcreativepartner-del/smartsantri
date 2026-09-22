# Dari trial ke operasional

Kode ini adalah trial frontend. Hosting berbayar dan domain saja belum membuat data tersinkron atau akun terlindungi. Sebelum digunakan oleh sekolah sungguhan, siapkan backend berikut.

| Bagian | Perilaku trial | Kebutuhan operasional |
|---|---|---|
| Login | ID contoh tanpa kata sandi | ID ditambah kredensial yang aman atau SSO; sesi server; pembatasan percobaan masuk |
| Hak akses | Pengecekan pada JavaScript browser | Otorisasi di setiap endpoint berdasarkan identitas, kelas, mapel, dan penugasan eskul |
| Data | IndexedDB pada browser | Database bersama; relasi, transaksi, backup, dan pemulihan |
| Tugas | Kunci jawaban ada di browser | Kunci jawaban hanya di server; siswa menerima soal tanpa jawaban |
| Penilaian | Perhitungan lokal | Pengumpulan dan penilaian atomik di server; satu pengumpulan per siswa/tugas; batas waktu dari jam server |
| Materi | Blob berkas lokal | Penyimpanan berkas bersama, validasi tipe/ukuran, serta URL akses berjangka sesuai izin |
| Absensi | Ketik ID, jam perangkat | Verifikasi identitas yang sesuai alur sekolah, waktu server, unique constraint siswa/guru per hari |
| Publikasi | Tersimpan pada satu browser | Publikasi dari database sekolah; persetujuan penggunaan foto siswa bila diperlukan |
| Domain | Origin trial GitHub Pages | Domain operasional, HTTPS, konfigurasi CORS yang terbatas, dan migrasi data yang direncanakan |

Model data dapat menjadi dasar migrasi: `users`, `classes`, `subjects`, `clubs`, `materials`, `assignments`, `submissions`, `attendance`, `news`, `announcements`, dan `achievements`. Untuk database relasional, pisahkan penugasan guru, keanggotaan eskul, soal, pilihan jawaban, serta kunci jawaban ke tabel terkait.

`BrowserRepository` di `dist/store.js` memisahkan akses IndexedDB dari model, tetapi mengganti repository saja **tidak cukup**: seluruh otorisasi, penilaian, validasi pengumpulan, dan pemilihan data yang boleh dikirim harus dipindahkan atau diterapkan ulang pada backend. Jangan mengirim seluruh state sekolah beserta kunci jawaban ke browser pengguna.

Pilihan teknologi backend dapat ditetapkan setelah hosting dipilih. Tidak ada backend, akun layanan berbayar, domain, rahasia, atau token operasional yang dibuat dalam paket trial ini.

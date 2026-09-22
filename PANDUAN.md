# Panduan mencoba Smart Santri

Gunakan browser yang sama untuk seluruh percobaan. Pilih **Keluar** di bagian bawah navigasi untuk berganti peran; tidak perlu menghapus data browser.

## 1. Admin menyiapkan sekolah

Masuk menggunakan `ADMIN001`.

1. **Data sekolah → Kelas**: tambahkan nama kelas, tingkat 1–6, dan tahun ajaran.
2. **Mata pelajaran**: tambahkan mapel yang dibutuhkan sekolah.
3. **Akun pengguna**: buat ID unik dan pilih peran. Untuk siswa, pilih satu kelas dan keanggotaan eskul. Untuk guru, centang kelas serta mapel yang diajar.
4. **Ekstrakurikuler**: tulis nama, deskripsi, jadwal, lalu pilih guru atau pembina yang bertanggung jawab.

Guru dan pembina tidak memiliki menu Data sekolah. Data yang masih digunakan akun, materi, nilai, atau riwayat tidak dapat dihapus.

## 2. Catat kehadiran

Buka **Absensi** dari landing page atau **Buka mesin absensi** dari portal.

1. Ketik `SISWA001` atau `GURU001`.
2. Tekan **Saya hadir**.
3. Periksa nama, ID, peran/kelas, tanggal, dan jam WIB pada pop-up.
4. Jika ID sama dimasukkan lagi hari itu, catatan pertama ditampilkan tanpa membuat duplikat.

Admin dapat melihat semua riwayat. Guru melihat catatan dirinya dan siswa kelasnya. Siswa melihat catatan dirinya. Pilih tanggal/kelas di Kehadiran untuk menyaring dan mengekspor CSV.

## 3. Guru menambahkan materi

Masuk sebagai `GURU001`, lalu buka **Ruang belajar → IV A → Tambah materi**.

1. Isi judul dan pilih mapel yang ditugaskan.
2. Tulis materi atau lampirkan berkas maksimal 5 MB.
3. Pilih apakah materi boleh diunduh.
4. Simpan, lalu buka materi untuk memeriksa tampilan.

Materi teks bisa dibaca langsung. PDF memakai penampil PDF browser; gambar dan TXT ditampilkan dalam portal. Dukungan PDF tertanam berbeda antarbrowser ponsel. Unduh, bila diizinkan, menjadi alternatif untuk membaca dengan aplikasi lain.

Guru hanya mengubah/menghapus materinya sendiri dalam kelas/mapel yang ditugaskan. Admin dapat mengelola semua materi.

## 4. Guru membuat tugas

Pada kelas IV A, pilih **Buat tugas**.

1. Isi judul, petunjuk, mapel, dan batas waktu opsional dalam WIB.
2. Tambahkan pertanyaan pilihan ganda, benar/salah, atau jawaban singkat.
3. Tentukan kunci jawaban dan bobot masing-masing soal.
4. Untuk jawaban singkat, pisahkan jawaban alternatif dengan `|`, misalnya `1/2|2/4`. Kapitalisasi dan spasi berlebih diabaikan; ejaan lain tidak dinilai secara semantik.
5. Pilih **Terbitkan tugas**.

Rumus nilai: **jumlah bobot jawaban benar ÷ jumlah bobot seluruh soal × 100**. Nilai dibulatkan dua angka desimal.

## 5. Siswa mengerjakan

Keluar dari akun guru, masuk sebagai `SISWA001`, lalu pilih **Ruang belajar → IV A**.

1. Baca materi yang tersedia.
2. Tekan **Kerjakan** pada tugas.
3. Jawab semua pertanyaan. Progres dan jawaban sementara tersimpan selama sesi browser pada perangkat yang sama.
4. Tekan **Kirim jawaban**, periksa konfirmasinya, lalu kirim.
5. Nilai dan pembahasan tampil langsung. Satu tugas hanya dapat dikumpulkan sekali.

Contoh tugas awal: jawaban benar adalah `1/4`, `Benar`, dan `1/2` atau `2/4` sehingga nilai 100.

Guru membuka tugas dan tab **Hasil siswa** untuk melihat nilai, jawaban, siswa yang belum mengumpulkan, dan mengekspor CSV. Setelah ada pengumpulan, buat tugas baru jika ingin mengganti soal atau kunci jawaban.

## 6. Pembina mengunggah materi eskul

Masuk sebagai `ESKUL001`, buka **Ekstrakurikuler → Tahfidz Al-Qur’an**, lalu pilih **Unggah materi**.

Aturan lampiran dan unduh sama dengan ruang belajar. Hanya admin dan pembina yang ditugaskan dapat mengelola materi. Siswa hanya melihat eskul yang dipilih admin dalam akun siswa.

## 7. Publikasikan kabar sekolah

Sebagai admin, buka **Publikasi** dan pilih:

- **Berita sekolah**: judul, kategori, isi, dan foto opsional.
- **Papan informasi**: pengumuman yang akan muncul di dashboard dan Kabar sekolah.
- **Siswa berprestasi**: nama, kelas, prestasi, keterangan, dan foto opsional.

Kabar sekolah dapat dibaca tanpa login, tetapi pada trial tetap berasal dari data browser tersebut. Ini belum menjadi sistem publikasi bersama ke semua pengunjung GitHub Pages.

## Memulai ulang data contoh

Gunakan pengaturan browser untuk menghapus **data situs Smart Santri**. Ini menghapus seluruh data trial, nilai, absensi, serta lampiran pada browser tersebut. Saat halaman dibuka kembali, contoh awal dibuat ulang. Jangan menghapus data situs jika masih ingin mempertahankan hasil percobaan.

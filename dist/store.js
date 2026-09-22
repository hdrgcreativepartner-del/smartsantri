(function (root) {
  'use strict';
  const VERSION = 1;
  const roles = { admin: 'Administrator', guru: 'Guru', pembina: 'Pembina eskul', siswa: 'Siswa' };
  const uid = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
  const clone = value => JSON.parse(JSON.stringify(value));
  const text = value => String(value ?? '').trim();
  const norm = value => text(value).normalize('NFKC').toLocaleLowerCase('id').replace(/\s+/g, ' ');
  function jakartaDay(value = new Date()) { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value)); }
  function seed() {
    return {
      version: VERSION,
      classes: [{ id: 'c1', name: 'IV A', level: '4', year: '2026/2027' }, { id: 'c2', name: 'V A', level: '5', year: '2026/2027' }],
      subjects: [{ id: 'm1', name: 'Matematika' }, { id: 'm2', name: 'Bahasa Indonesia' }, { id: 'm3', name: 'Pendidikan Agama Islam' }],
      users: [
        { id: 'u0', code: 'ADMIN001', name: 'Admin Sekolah', role: 'admin', classId: '', classIds: [], subjectIds: [], clubIds: [] },
        { id: 'u1', code: 'GURU001', name: 'Ibu Salma', role: 'guru', classId: '', classIds: ['c1'], subjectIds: ['m1', 'm2'], clubIds: ['e2'] },
        { id: 'u2', code: 'GURU002', name: 'Bapak Yusuf', role: 'guru', classId: '', classIds: ['c2'], subjectIds: ['m1', 'm3'], clubIds: [] },
        { id: 'u3', code: 'ESKUL001', name: 'Ustazah Nisa', role: 'pembina', classId: '', classIds: [], subjectIds: [], clubIds: ['e1'] },
        { id: 'u4', code: 'SISWA001', name: 'Alya Rahma', role: 'siswa', classId: 'c1', classIds: [], subjectIds: [], clubIds: ['e1', 'e2'] },
        { id: 'u5', code: 'SISWA002', name: 'Rafi Ahmad', role: 'siswa', classId: 'c1', classIds: [], subjectIds: [], clubIds: ['e2'] },
        { id: 'u6', code: 'SISWA003', name: 'Naufal Hakim', role: 'siswa', classId: 'c2', classIds: [], subjectIds: [], clubIds: ['e1'] }
      ],
      clubs: [{ id: 'e1', name: 'Tahfidz Al-Qur’an', description: 'Belajar menghafal, memperbaiki bacaan, dan menjaga adab terhadap Al-Qur’an.', schedule: 'Selasa · 14.00–15.00 WIB', coachIds: ['u3'] }, { id: 'e2', name: 'Pramuka', description: 'Melatih kemandirian, kepedulian, dan kerja sama lewat kegiatan yang menyenangkan.', schedule: 'Jumat · 14.00–15.30 WIB', coachIds: ['u1'] }],
      materials: [
        { id: 'b1', title: 'Mengenal pecahan sederhana', content: 'Pecahan adalah bagian dari keseluruhan. Jika sebuah lingkaran dibagi menjadi 4 bagian yang sama, setiap bagian bernilai 1/4.\n\nPembilang menunjukkan bagian yang diambil. Penyebut menunjukkan banyaknya bagian yang sama besar.\n\nCoba di rumah: gambar sebuah persegi, bagi menjadi empat bagian sama besar, lalu warnai satu bagian.', classId: 'c1', subjectId: 'm1', clubId: '', authorId: 'u1', downloadable: true, fileId: '', createdAt: '2026-09-14T01:00:00.000Z' },
        { id: 'b2', title: 'Adab sebelum menghafal', content: 'Awali dengan niat yang baik dan berdoa. Pilih tempat yang tenang. Dengarkan bacaan pembina, lalu ulangi sedikit demi sedikit.\n\nJaga kebersihan dan biasakan membaca dengan tartil. Setoran hafalan dilakukan bersama pembina saat kegiatan.', classId: '', subjectId: '', clubId: 'e1', authorId: 'u3', downloadable: false, fileId: '', createdAt: '2026-09-15T06:00:00.000Z' }
      ],
      assignments: [{ id: 't1', title: 'Latihan pecahan — bagian dan keseluruhan', description: 'Baca setiap pertanyaan dengan teliti. Nilai langsung muncul setelah jawaban dikirim. Setiap siswa memiliki satu kesempatan.', classId: 'c1', subjectId: 'm1', authorId: 'u1', dueAt: '', createdAt: '2026-09-15T01:00:00.000Z', questions: [
        { id: 'q1', type: 'choice', text: 'Satu dari empat bagian yang sama besar ditulis sebagai …', options: ['1/2', '1/3', '1/4', '4/1'], answer: '2', points: 10 },
        { id: 'q2', type: 'boolean', text: 'Pada pecahan 3/5, angka 5 disebut penyebut.', options: ['Benar', 'Salah'], answer: '0', points: 10 },
        { id: 'q3', type: 'short', text: 'Berapa hasil 1/4 + 1/4? Tulis sebagai pecahan.', options: [], answer: '1/2|2/4', points: 10 }
      ] }],
      submissions: [], attendance: [],
      news: [{ id: 'n1', title: 'Membaca bersama, membuka jendela dunia', content: 'Contoh berita sekolah. Kegiatan literasi dapat menjadi kesempatan bagi siswa untuk berbagi cerita dan menemukan bacaan yang mereka sukai.\n\nAdmin dapat mengganti contoh ini dengan kegiatan nyata sekolah melalui menu Publikasi.', category: 'Kegiatan sekolah', imageId: '', createdAt: '2026-09-16T02:00:00.000Z' }],
      announcements: [{ id: 'i1', title: 'Selamat datang di trial Smart Santri', content: 'Semua nama, kelas, materi, dan kegiatan awal adalah data contoh. Gunakan ID demo untuk mencoba tiap peran. Data hanya tersedia pada browser ini.', createdAt: '2026-09-16T00:00:00.000Z' }],
      achievements: [{ id: 'p1', name: 'Alya Rahma', className: 'IV A', title: 'Apresiasi Sahabat Literasi', description: 'Contoh tampilan apresiasi untuk siswa yang aktif membaca dan berbagi cerita.', imageId: '', createdAt: '2026-09-16T00:00:00.000Z' }]
    };
  }
  class BrowserRepository {
    async open() {
      this.db = await new Promise((resolve, reject) => {
        const req = indexedDB.open('smart-santri-trial', VERSION);
        req.onupgradeneeded = () => { req.result.createObjectStore('state'); req.result.createObjectStore('files'); };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(new Error('Penyimpanan browser tidak tersedia. Buka dengan browser biasa dan izinkan penyimpanan situs.'));
      });
      return this;
    }
    async transaction(store, mode, callback) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(store, mode);
        const req = callback(tx.objectStore(store));
        tx.oncomplete = () => resolve(req?.result);
        tx.onerror = () => reject(new Error('Data belum tersimpan. Ruang penyimpanan browser mungkin penuh.'));
        tx.onabort = () => reject(new Error('Penyimpanan dibatalkan. Silakan coba lagi.'));
      });
    }
    read() { return this.transaction('state', 'readonly', s => s.get('school')); }
    write(data) { return this.transaction('state', 'readwrite', s => s.put(data, 'school')); }
    getFile(id) { return this.transaction('files', 'readonly', s => s.get(id)); }
    putFile(id, file) { return this.transaction('files', 'readwrite', s => s.put(file, id)); }
    deleteFile(id) { return this.transaction('files', 'readwrite', s => s.delete(id)); }
  }
  class Model {
    constructor(repo) { this.repo = repo; this.actorId = ''; this.data = null; }
    async open() { this.data = await this.repo.read(); if (!this.data) { this.data = seed(); await this.repo.write(this.data); } return this; }
    async refresh() { this.data = await this.repo.read() || this.data; }
    get actor() { return this.data.users.find(u => u.id === this.actorId); }
    find(collection, id) { return this.data[collection].find(item => item.id === id); }
    login(code) { const u = this.data.users.find(item => item.code === text(code).toUpperCase()); if (!u) throw new Error('ID tidak ditemukan. Periksa ID atau hubungi admin sekolah.'); this.actorId = u.id; return u; }
    require(...allowed) { if (!this.actor || !allowed.includes(this.actor.role)) throw new Error('Akses ini tidak tersedia untuk peran Anda.'); return this.actor; }
    requireAdmin() { return this.require('admin'); }
    teach(classId, subjectId) { const u = this.actor; return !!u && (u.role === 'admin' || (u.role === 'guru' && u.classIds.includes(classId) && u.subjectIds.includes(subjectId))); }
    coach(clubId) { const u = this.actor; return !!u && (u.role === 'admin' || this.find('clubs', clubId)?.coachIds.includes(u.id)); }
    canRead(item) {
      const u = this.actor; if (!u) return false;
      if (u.role === 'admin') return true;
      if (item.clubId) return this.coach(item.clubId) || (u.role === 'siswa' && u.clubIds.includes(item.clubId));
      return (u.role === 'siswa' && u.classId === item.classId) || this.teach(item.classId, item.subjectId);
    }
    canEdit(item) { return !!this.actor && (this.actor.role === 'admin' || (item.authorId === this.actor.id && (item.clubId ? this.coach(item.clubId) : this.teach(item.classId, item.subjectId)))); }
    visible(collection) { return this.data[collection].filter(item => this.canRead(item)); }
    async mutate(callback) {
      const execute = async () => {
        await this.refresh(); const before = clone(this.data);
        try { const result = callback(); await this.repo.write(this.data); return result; }
        catch (e) { this.data = before; throw e; }
      };
      return typeof navigator !== 'undefined' && navigator.locks ? navigator.locks.request('smart-santri-data', execute) : execute();
    }
    validateTitle(title) { if (!text(title) || text(title).length > 200) throw new Error('Judul atau nama wajib diisi, maksimal 200 karakter.'); }
    async saveMaster(type, input) {
      return this.mutate(() => {
        this.requireAdmin(); if (!['classes', 'subjects', 'users', 'clubs'].includes(type)) throw new Error('Jenis data tidak valid.');
        const d = this.data; const existing = input.id ? this.find(type, input.id) : null;
        if (input.id && !existing) throw new Error('Data tidak ditemukan.');
        this.validateTitle(input.name); const record = { id: existing?.id || uid(), name: text(input.name) };
        if (type === 'classes') {
          if (!['1','2','3','4','5','6'].includes(String(input.level))) throw new Error('Tingkat kelas harus 1–6.');
          if (!/^\d{4}\/\d{4}$/.test(text(input.year))) throw new Error('Tahun ajaran harus seperti 2026/2027.');
          Object.assign(record, { level: String(input.level), year: text(input.year) });
        }
        if (type === 'users') {
          const code = text(input.code).toUpperCase();
          if (!/^[A-Z0-9_-]{3,30}$/.test(code)) throw new Error('ID berisi 3–30 huruf, angka, tanda - atau _.');
          if (d.users.some(u => u.id !== record.id && u.code === code)) throw new Error('ID sudah digunakan. Pilih ID yang berbeda.');
          if (!roles[input.role]) throw new Error('Peran tidak valid.');
          if (existing?.role === 'admin' && input.role !== 'admin' && d.users.filter(u => u.role === 'admin').length === 1) throw new Error('Sekolah harus memiliki minimal satu admin.');
          if (existing && existing.role !== input.role && (d.materials.some(m => m.authorId === existing.id) || d.assignments.some(t => t.authorId === existing.id) || d.submissions.some(s => s.studentId === existing.id))) throw new Error('Peran akun yang sudah memiliki materi atau nilai tidak dapat diubah.');
          const classId = input.role === 'siswa' ? input.classId : '';
          if (input.role === 'siswa' && !this.find('classes', classId)) throw new Error('Pilih kelas siswa.');
          const validIds = (ids, collection) => [...new Set(ids || [])].filter(id => this.find(collection, id));
          Object.assign(record, { code, role: input.role, classId, classIds: input.role === 'guru' ? validIds(input.classIds, 'classes') : [], subjectIds: input.role === 'guru' ? validIds(input.subjectIds, 'subjects') : [], clubIds: input.role === 'siswa' ? validIds(input.clubIds, 'clubs') : [] });
        }
        if (type === 'clubs') {
          const coachIds = [...new Set(input.coachIds || [])].filter(id => ['guru', 'pembina'].includes(this.find('users', id)?.role));
          if (!coachIds.length) throw new Error('Pilih minimal satu guru atau pembina eskul.');
          Object.assign(record, { description: text(input.description), schedule: text(input.schedule), coachIds });
        }
        if (type !== 'users' && d[type].some(v => v.id !== record.id && norm(v.name) === norm(record.name))) throw new Error('Nama tersebut sudah ada.');
        if (existing) d[type][d[type].findIndex(v => v.id === existing.id)] = record; else d[type].push(record);
        return record;
      });
    }
    async deleteMaster(type, id) {
      return this.mutate(() => {
        this.requireAdmin(); const d = this.data; const item = this.find(type, id); if (!item) throw new Error('Data tidak ditemukan.');
        let used = false;
        if (type === 'classes') used = d.users.some(u => u.classId === id || u.classIds.includes(id)) || [...d.materials, ...d.assignments].some(m => m.classId === id);
        else if (type === 'subjects') used = d.users.some(u => u.subjectIds.includes(id)) || [...d.materials, ...d.assignments].some(m => m.subjectId === id);
        else if (type === 'clubs') used = d.users.some(u => u.clubIds.includes(id)) || d.materials.some(m => m.clubId === id);
        else if (type === 'users') {
          if (id === this.actor.id) throw new Error('Akun yang sedang digunakan tidak dapat dihapus.');
          if (item.role === 'admin' && d.users.filter(u => u.role === 'admin').length === 1) throw new Error('Admin terakhir tidak dapat dihapus.');
          used = d.materials.some(m => m.authorId === id) || d.assignments.some(a => a.authorId === id) || d.submissions.some(s => s.studentId === id) || d.attendance.some(a => a.userId === id) || d.clubs.some(c => c.coachIds.includes(id));
        } else throw new Error('Jenis data tidak valid.');
        if (used) throw new Error('Data masih terhubung dengan akun, materi, kegiatan, atau riwayat. Lepaskan keterkaitannya terlebih dahulu.');
        d[type] = d[type].filter(v => v.id !== id);
      });
    }
    validateScope(input) {
      if (input.clubId) {
        if (!this.find('clubs', input.clubId) || !this.coach(input.clubId)) throw new Error('Anda bukan pembina ekstrakurikuler ini.');
      } else if (!this.find('classes', input.classId) || !this.find('subjects', input.subjectId) || !this.teach(input.classId, input.subjectId)) throw new Error('Kelas atau mata pelajaran ini tidak ditugaskan kepada Anda.');
    }
    async saveMaterial(input) {
      return this.mutate(() => {
        this.require('admin', 'guru', 'pembina'); this.validateTitle(input.title); this.validateScope(input);
        const existing = input.id ? this.find('materials', input.id) : null;
        if (input.id && (!existing || !this.canEdit(existing))) throw new Error('Materi ini tidak dapat Anda ubah.');
        if (!text(input.content) && !input.fileId) throw new Error('Tulis isi materi atau unggah lampiran.');
        const item = { id: existing?.id || uid(), title: text(input.title), content: text(input.content), classId: input.clubId ? '' : input.classId, subjectId: input.clubId ? '' : input.subjectId, clubId: input.clubId || '', downloadable: !!input.downloadable, fileId: input.fileId || '', fileName: input.fileName || '', fileType: input.fileType || '', authorId: existing?.authorId || this.actor.id, createdAt: existing?.createdAt || new Date().toISOString() };
        if (existing) this.data.materials[this.data.materials.indexOf(existing)] = item; else this.data.materials.unshift(item);
        return item;
      });
    }
    async deleteMaterial(id) { return this.mutate(() => { const item = this.find('materials', id); if (!item || !this.canEdit(item)) throw new Error('Materi ini tidak dapat Anda hapus.'); this.data.materials = this.data.materials.filter(m => m.id !== id); }); }
    validateQuestions(questions) {
      if (!Array.isArray(questions) || !questions.length || questions.length > 50) throw new Error('Tugas harus berisi 1–50 pertanyaan.');
      return questions.map(q => {
        this.validateTitle(q.text); const points = Number(q.points);
        if (!Number.isFinite(points) || points < 1 || points > 100) throw new Error('Bobot setiap soal harus 1–100.');
        if (!['choice', 'boolean', 'short'].includes(q.type)) throw new Error('Jenis soal tidak valid.');
        const options = q.type === 'boolean' ? ['Benar', 'Salah'] : q.type === 'choice' ? q.options.map(text) : [];
        if (q.type !== 'short' && (options.length < 2 || options.length > 6 || options.some(o => !o))) throw new Error('Pilihan jawaban wajib diisi (2–6 pilihan).');
        if (q.type !== 'short' && (!/^\d+$/.test(String(q.answer)) || Number(q.answer) >= options.length)) throw new Error('Pilih kunci jawaban yang benar.');
        if (q.type === 'short' && !text(q.answer).split('|').some(norm)) throw new Error('Isi kunci jawaban singkat.');
        return { id: q.id || uid(), text: text(q.text), type: q.type, options, answer: text(q.answer), points };
      });
    }
    async saveAssignment(input) {
      return this.mutate(() => {
        this.require('admin', 'guru'); this.validateTitle(input.title); this.validateScope({ ...input, clubId: '' });
        const existing = input.id ? this.find('assignments', input.id) : null;
        if (input.id && (!existing || !this.canEdit(existing))) throw new Error('Tugas tidak dapat Anda ubah.');
        if (existing && this.data.submissions.some(s => s.assignmentId === existing.id)) throw new Error('Tugas yang sudah dikerjakan tidak dapat diubah. Buat tugas baru untuk menjaga keutuhan nilai.');
        if (input.dueAt && !Number.isFinite(new Date(input.dueAt).getTime())) throw new Error('Batas waktu tidak valid.');
        const item = { id: existing?.id || uid(), title: text(input.title), description: text(input.description), classId: input.classId, subjectId: input.subjectId, dueAt: input.dueAt || '', questions: this.validateQuestions(input.questions), authorId: existing?.authorId || this.actor.id, createdAt: existing?.createdAt || new Date().toISOString() };
        if (existing) this.data.assignments[this.data.assignments.indexOf(existing)] = item; else this.data.assignments.unshift(item);
        return item;
      });
    }
    async deleteAssignment(id) {
      return this.mutate(() => {
        const item = this.find('assignments', id); if (!item || !this.canEdit(item)) throw new Error('Tugas ini tidak dapat Anda hapus.');
        if (this.data.submissions.some(s => s.assignmentId === id)) throw new Error('Tugas yang sudah mempunyai nilai tidak dapat dihapus.');
        this.data.assignments = this.data.assignments.filter(t => t.id !== id);
      });
    }
    async submit(id, answers) {
      return this.mutate(() => {
        const u = this.require('siswa'); const task = this.find('assignments', id);
        if (!task || !this.canRead(task)) throw new Error('Tugas ini bukan untuk kelas Anda.');
        if (task.dueAt && Date.now() > new Date(task.dueAt).getTime()) throw new Error('Batas waktu pengumpulan sudah lewat.');
        if (this.data.submissions.some(s => s.assignmentId === id && s.studentId === u.id)) throw new Error('Jawaban sudah dikirim. Setiap tugas hanya dapat dikumpulkan satu kali.');
        const result = task.questions.map(q => {
          const value = text(answers[q.id]); if (!value) throw new Error('Jawab semua pertanyaan sebelum mengirim.');
          if (q.type !== 'short' && (!/^\d+$/.test(value) || Number(value) >= q.options.length)) throw new Error('Jawaban pilihan tidak valid.');
          const correct = q.type === 'short' ? q.answer.split('|').map(norm).includes(norm(value)) : q.answer === value;
          return { questionId: q.id, value, correct, earned: correct ? q.points : 0, possible: q.points };
        });
        const earned = result.reduce((a, r) => a + r.earned, 0), possible = result.reduce((a, r) => a + r.possible, 0);
        const item = { id: uid(), assignmentId: id, studentId: u.id, answers: result, score: Math.round(earned / possible * 10000) / 100, earned, possible, submittedAt: new Date().toISOString() };
        this.data.submissions.push(item); return item;
      });
    }
    async attend(code) {
      return this.mutate(() => {
        const u = this.data.users.find(v => v.code === text(code).toUpperCase());
        if (!u) throw new Error('ID tidak ditemukan. Periksa ID atau hubungi admin.');
        if (!['guru', 'siswa'].includes(u.role)) throw new Error('Absensi ini khusus siswa dan guru.');
        const day = jakartaDay(); const existing = this.data.attendance.find(a => a.userId === u.id && a.day === day);
        if (existing) return { record: existing, user: u, duplicate: true };
        const record = { id: uid(), userId: u.id, code: u.code, name: u.name, role: u.role, className: this.find('classes', u.classId)?.name || '', day, time: new Date().toISOString(), status: 'Hadir' };
        this.data.attendance.push(record); return { record, user: u, duplicate: false };
      });
    }
    attendanceForActor() {
      const u = this.actor; if (!u) return [];
      if (u.role === 'admin') return this.data.attendance;
      if (u.role === 'guru') return this.data.attendance.filter(a => a.userId === u.id || (this.find('users', a.userId)?.role === 'siswa' && u.classIds.includes(this.find('users', a.userId)?.classId)));
      return this.data.attendance.filter(a => a.userId === u.id);
    }
    async savePublication(type, input) {
      return this.mutate(() => {
        this.requireAdmin(); if (!['news', 'announcements', 'achievements'].includes(type)) throw new Error('Jenis publikasi tidak valid.'); this.validateTitle(input.title);
        const existing = input.id ? this.find(type, input.id) : null; if (input.id && !existing) throw new Error('Publikasi tidak ditemukan.');
        const item = { id: existing?.id || uid(), title: text(input.title), content: text(input.content), createdAt: existing?.createdAt || new Date().toISOString() };
        if (type === 'news') Object.assign(item, { category: text(input.category) || 'Sekolah', imageId: input.imageId || '' });
        if (type === 'achievements') { this.validateTitle(input.name); Object.assign(item, { name: text(input.name), className: text(input.className), description: text(input.description), imageId: input.imageId || '' }); }
        if (existing) this.data[type][this.data[type].indexOf(existing)] = item; else this.data[type].unshift(item);
        return item;
      });
    }
    async deletePublication(type, id) { return this.mutate(() => { this.requireAdmin(); if (!['news', 'announcements', 'achievements'].includes(type)) throw new Error('Jenis publikasi tidak valid.'); this.data[type] = this.data[type].filter(v => v.id !== id); }); }
    async upload(file, imagesOnly = false) {
      this.require('admin', 'guru', 'pembina');
      if (!file || file.size === 0 || file.size > 5 * 1024 * 1024) throw new Error('Ukuran berkas harus lebih dari 0 dan maksimal 5 MB.');
      const types = imagesOnly ? ['image/jpeg', 'image/png', 'image/webp'] : ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain'];
      if (!types.includes(file.type)) throw new Error(imagesOnly ? 'Gunakan gambar JPG, PNG, atau WebP.' : 'Lampiran mendukung PDF, JPG, PNG, WebP, dan TXT.');
      const id = uid(); await this.repo.putFile(id, file); return { id, name: file.name, type: file.type };
    }
  }
  root.SmartSantri = { Model, BrowserRepository, seed, roles, uid, jakartaDay, norm };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SmartSantri;
})(typeof window !== 'undefined' ? window : globalThis);

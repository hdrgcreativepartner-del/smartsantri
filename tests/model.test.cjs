const test = require('node:test');
const assert = require('node:assert/strict');
const {Model,seed,jakartaDay} = require('../dist/store.js');
class MemoryRepository {
  constructor(){this.state=seed();this.files=new Map();}
  async read(){return structuredClone(this.state);}
  async write(data){this.state=structuredClone(data);}
  async putFile(id,file){this.files.set(id,file);}
  async getFile(id){return this.files.get(id);}
}
async function account(code){const m=await new Model(new MemoryRepository()).open();if(code)m.login(code);return m;}
test('admin alone can create classes and subjects',async()=>{
  for(const code of ['GURU001','SISWA001','ESKUL001']){
    const m=await account(code);
    await assert.rejects(m.saveMaster('classes',{name:'VI A',level:'6',year:'2026/2027'}),/Akses/);
    await assert.rejects(m.saveMaster('subjects',{name:'IPA'}),/Akses/);
  }
  const m=await account('ADMIN001'),c=await m.saveMaster('classes',{name:'VI A',level:'6',year:'2026/2027'});
  assert.equal(m.find('classes',c.id).name,'VI A');
  await assert.rejects(m.saveMaster('classes',{name:'VI A',level:'6',year:'2026/2027'}),/sudah ada/);
});
test('teacher is limited to assigned classes and subjects',async()=>{
  const m=await account('GURU001');
  assert.equal(m.teach('c1','m1'),true);assert.equal(m.teach('c2','m1'),false);assert.equal(m.teach('c1','m3'),false);
  await assert.rejects(m.saveMaterial({title:'Tidak boleh',content:'Konten',classId:'c2',subjectId:'m1'}),/tidak ditugaskan/);
  await assert.rejects(m.saveMaterial({title:'Tidak boleh',content:'Konten',classId:'c1',subjectId:'m3'}),/tidak ditugaskan/);
  const item=await m.saveMaterial({title:'Materi baru',content:'Konten',classId:'c1',subjectId:'m1',downloadable:false});
  assert.equal(item.authorId,'u1');assert.equal(item.downloadable,false);
});
test('student cannot edit school data or teacher content',async()=>{
  const m=await account('SISWA001');
  await assert.rejects(m.saveMaterial({title:'Tidak boleh',content:'x',classId:'c1',subjectId:'m1'}),/Akses/);
  await assert.rejects(m.deleteMaterial('b1'),/tidak dapat/);
  await assert.rejects(m.savePublication('news',{title:'Tidak boleh'}),/Akses/);
});
test('extracurricular access is limited by assignment and membership',async()=>{
  const m=await account('ESKUL001');assert.equal(m.coach('e1'),true);assert.equal(m.coach('e2'),false);
  const material=await m.saveMaterial({title:'Latihan tahfidz',content:'x',clubId:'e1'});
  assert.equal(material.clubId,'e1');
  await assert.rejects(m.saveMaterial({title:'Tidak boleh',content:'x',clubId:'e2'}),/bukan pembina/);
  m.login('SISWA002');assert.equal(m.canRead(material),false);m.login('SISWA001');assert.equal(m.canRead(material),true);
});
test('a teacher cannot edit another teacher’s content',async()=>{
  const m=await account('GURU002');assert.equal(m.canEdit(m.find('materials','b1')),false);
  await assert.rejects(m.deleteMaterial('b1'),/tidak dapat/);
});
test('attendance records identity and time once per Jakarta day',async()=>{
  const m=await account();const first=await m.attend(' siswa001 '),second=await m.attend('SISWA001');
  assert.equal(first.record.name,'Alya Rahma');assert.equal(first.record.className,'IV A');assert.equal(first.record.day,jakartaDay());
  assert.equal(first.duplicate,false);assert.equal(second.duplicate,true);assert.equal(first.record.time,second.record.time);
  assert.equal(m.data.attendance.length,1);await m.attend('GURU001');assert.equal(m.data.attendance.length,2);
  await assert.rejects(m.attend('UNKNOWN'),/tidak ditemukan/);await assert.rejects(m.attend('ADMIN001'),/khusus/);
});
test('Jakarta dates respect midnight independent of device timezone',()=>{
  assert.equal(jakartaDay('2026-09-21T16:59:59.000Z'),'2026-09-21');
  assert.equal(jakartaDay('2026-09-21T17:00:00.000Z'),'2026-09-22');
});
test('automatic scoring handles choice, boolean and normalized short answers',async()=>{
  const m=await account('SISWA001');const result=await m.submit('t1',{q1:'2',q2:'0',q3:'  2/4  '});
  assert.equal(result.score,100);assert.equal(result.answers.length,3);assert.equal(result.earned,30);
  await assert.rejects(m.submit('t1',{q1:'2',q2:'0',q3:'1/2'}),/sudah dikirim/);
  m.login('SISWA002');const partial=await m.submit('t1',{q1:'1',q2:'0',q3:'1/2'});assert.equal(partial.score,66.67);
});
test('student cannot submit a different class, incomplete answers or invalid option',async()=>{
  const m=await account('SISWA003');await assert.rejects(m.submit('t1',{q1:'2',q2:'0',q3:'1/2'}),/bukan untuk kelas/);
  m.login('SISWA001');await assert.rejects(m.submit('t1',{q1:'2'}),/semua pertanyaan/);
  await assert.rejects(m.submit('t1',{q1:'100',q2:'0',q3:'1/2'}),/tidak valid/);assert.equal(m.data.submissions.length,0);
});
test('weights affect grades and expired deadlines block submission',async()=>{
  const m=await account('GURU001');let t=await m.saveAssignment({title:'Bobot',classId:'c1',subjectId:'m1',questions:[{type:'short',text:'Sebutkan salam',answer:'salam|assalamu’alaikum',points:30},{type:'boolean',text:'Satu tambah satu dua',options:[],answer:'0',points:70}]});
  m.login('SISWA001');const result=await m.submit(t.id,{[t.questions[0].id]:' SALAM ',[t.questions[1].id]:'1'});assert.equal(result.score,30);
  m.login('GURU001');t=await m.saveAssignment({title:'Lewat',classId:'c1',subjectId:'m1',dueAt:'2020-01-01T00:00:00.000Z',questions:[{type:'short',text:'Berapa dua tambah dua?',answer:'4',points:10}]});
  m.login('SISWA001');await assert.rejects(m.submit(t.id,{[t.questions[0].id]:'4'}),/sudah lewat/);
});
test('completed assignments cannot have keys changed or be deleted',async()=>{
  const m=await account('SISWA001');await m.submit('t1',{q1:'2',q2:'0',q3:'1/2'});m.login('GURU001');
  await assert.rejects(m.saveAssignment({...m.find('assignments','t1'),title:'Changed'}),/sudah dikerjakan/);
  await assert.rejects(m.deleteAssignment('t1'),/sudah mempunyai nilai/);
});
test('ID uniqueness and data references are preserved',async()=>{
  const m=await account('ADMIN001');
  await assert.rejects(m.saveMaster('users',{name:'Duplikat',role:'siswa',code:'SISWA001',classId:'c1'}),/sudah digunakan/);
  await assert.rejects(m.deleteMaster('classes','c1'),/masih terhubung/);
  await assert.rejects(m.deleteMaster('users','u0'),/sedang digunakan/);
  await assert.rejects(m.saveMaster('users',{...m.find('users','u0'),role:'guru'}),/minimal satu admin/);
});
test('persistence failure rolls back the in-memory state',async()=>{
  const m=await account('ADMIN001');m.repo.write=async()=>{throw new Error('disk full')};
  await assert.rejects(m.saveMaster('subjects',{name:'IPA'}),/disk full/);assert.equal(m.data.subjects.length,3);
});
test('file upload rejects unsupported, oversized, empty and unauthorized files',async()=>{
  const m=await account('GURU001');
  await assert.rejects(m.upload({size:100,type:'text/html'}),/mendukung/);
  await assert.rejects(m.upload({size:6*1024*1024,type:'application/pdf'}),/maksimal/);
  await assert.rejects(m.upload({size:0,type:'application/pdf'}),/maksimal/);
  const f=await m.upload({size:100,type:'application/pdf',name:'materi.pdf'});assert.equal(f.name,'materi.pdf');
  m.login('SISWA001');await assert.rejects(m.upload({size:100,type:'application/pdf'}),/Akses/);
});
test('attendance history follows the current actor’s scope',async()=>{
  const m=await account();await m.attend('SISWA001');await m.attend('SISWA003');await m.attend('GURU001');
  m.login('GURU001');assert.equal(m.attendanceForActor().length,2);
  m.login('SISWA001');assert.equal(m.attendanceForActor().length,1);
  m.login('ADMIN001');assert.equal(m.attendanceForActor().length,3);
});

# 💌 Cute Confession Website (Web Tembak Pacar Interaktif) ✨

Website romantis, playful, dan cute yang dibuat khusus untuk nembak gebetan / teman cewek kamu dengan interaksi yang seru dan menggemaskan!

---

## ✨ Fitur-Fitur Keren
1. **Surat / Amplop Rahasia 3D:** Amplop interaktif yang bisa diklik untuk membuka surat pengakuan cinta.
2. **Tombol "Nggak" yang Kabur-kaburan (Evasive Button):** Kalau kursor mendekat atau layar disentuh, tombol *Nggak* bakal loncat menghindar sambil mengeluarkan kalimat-kalimat lucu!
3. **Tombol "Mau" yang Membesar Otomatis:** Setiap kali dia berusaha ngeklik tombol *Nggak*, tombol *Mau* bakal membesar secara otomatis biar makin gampang diklik!
4. **Hujan Konfeti Super Meriah:** Ledakan konfeti warna-warni dan partikel hati saat dia menekan tombol *Mau*.
5. **Kupon Kencan Interaktif:** Kupon spesial (Eskrim/Boba, Movie Date, Night Ride, Curhat 24/7) yang bisa diklik untuk klaim cap "TERKLAIM ✨".
6. **Tombol Konfirmasi Otomatis ke WhatsApp:** Begitu dia klik YES, ada tombol yang langsung membuka WhatsApp dengan pesan manis otomatis yang tinggal dia kirim ke kamu.
7. **Musik & Sound Effect Otomatis:** Melodi romantis lembut bawaan (synthesizer Web Audio API) tanpa takut link audio mati atau copyright.
8. **Mascot Chibi 3D Gemas:** Gambar maskot teddy bear lucu yang siap meluluhkan hatinya.

---

## 🛠️ Cara Kustomisasi (Edit Nama & Pesan)

Cukup buka file [`config.js`](file:///c:/Playground/GF/config.js) lalu ubah variabel berikut sesuai keinginanmu:

```javascript
const CONFIG = {
  herName: "Sarah",            // Ganti nama panggilan dia
  yourName: "Gevriel",         // Ganti nama panggilan kamu
  waNumber: "6281234567890",   // Ganti nomor WhatsApp kamu (format: 628...)
  confessionMessage: "...",    // Isi ungkapan isi hati kamu
  ...
};
```

---

## 🚀 Cara Tes di Laptop / PC Sendiri

Kamu bisa langsung klik dua kali file [`index.html`](file:///c:/Playground/GF/index.html) di File Explorer untuk membukanya di browser, atau jalankan local server jika mau:

```bash
# Jalankan menggunakan python atau live-server (opsional)
npx serve
```

---

## 🌐 Cara Publish ke Vercel (Gratis & Cepat)

### Opsi A: Lewat GitHub & Vercel Dashboard (Paling Populer & Mudah)
1. Buat repository baru di [GitHub](https://github.com/new).
2. Upload atau push folder ini ke repository GitHub kamu:
   ```bash
   git init
   git add .
   git commit -m "feat: romantic confession website"
   git branch -M main
   git remote add origin https://github.com/USERNAME-KAMU/NAMA-REPO.git
   git push -u origin main
   ```
3. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub kamu.
4. Klik tombol **"Add New Project"** lalu pilih repository yang barusan kamu upload.
5. Klik **"Deploy"**! Dalam 30 detik kamu bakal dapet link gratis (contoh: `https://buat-kamu.vercel.app`) yang siap kamu kirim ke dia! 💕

### Opsi B: Langsung dari Terminal (Vercel CLI)
Cukup jalankan perintah ini di folder project:
```bash
npx vercel
```
Ikuti petunjuk di terminal (pilih default / tekan Enter saja). Vercel akan langsung memberikan URL website yang aktif!

---

*Semoga sukses dan diterima ya bro! 💖*

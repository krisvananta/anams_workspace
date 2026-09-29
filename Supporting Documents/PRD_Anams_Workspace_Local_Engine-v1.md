# 📄 PRODUCT REQUIREMENT DOCUMENT (PRD)

**Nama Proyek**: Procurement Automation Engine (Local Standalone Desktop Edition)  
**Versi**: 2.0 (Local-First Desktop Architecture & Comprehensive Procurement Specification)  
**Product Owner**: Khoirul Anam  
**Lead Developer Target**: Mas Yoga & Tim Sanggabiz  
**Status**: Ready for Development  

---

## ⚠️ CATATAN FLEKSIBILITAS & DESAIN LOKAL (DISCLAIMER UNTUK DEVELOPER)

> **Catatan Penting untuk Mas Yoga & Tim Sanggabiz**:  
> Dokumen PRD ini disusun sebagai peta panduan teknis (*baseline requirements*) yang **fleksibel dan adaptif**. Mas Yoga dan Tim Sanggabiz diberikan **kebebasan penuh** untuk memberikan usulan, menyempurnakan, atau menyesuaikan pendekatan teknologi, pustaka GUI, serta alur UI/UX lokal selama fungsi utama otomasi 11 dokumen pra-pengadaan, ekstraksi DPA, audit mismatch, serta pengolahan narasi via Gemini API berjalan optimal.

---

## 1. EXECUTIVE SUMMARY & SYSTEM VISION

**Procurement Automation Engine** adalah aplikasi desktop lokal (*standalone desktop application*) yang dirancang khusus untuk mengotomatiskan penyusunan **11 dokumen pra-pengadaan barang/jasa** pemerintah (Pengadaan Langsung Jasa Konsultansi Non-Tender < Rp 100 Juta) pada BPKAD Kota Yogyakarta.

Dengan berjalan secara lokal (*local-first architecture*) di komputer pengguna, aplikasi ini memberikan jaminan **keamanan dan kerahasiaan penuh data birokrasi** (DPA, KAK, dan Master Anggaran) tanpa memerlukan biaya sewa server cloud maupun sistem login yang rumit. Engine utama menggabungkan pemrosesan dokumen Python lokal dengan **Gemini API** (outbound HTTPS) untuk merestrukturisasi narasi KAK ke dalam 17 Poin Baku, menghitung HPS secara otomatis berbasis Standar Harga Barang Jasa (SHBJ), serta menerbitkan seluruh paket berkas pengadaan dalam format `.docx`, `.pdf`, `.xlsx` (rumus aktif), dan `.zip`.

---

## 2. DESIGN SYSTEM & LOCAL GUI REQUIREMENT

Antarmuka aplikasi desktop mengacu pada prinsip UI/UX yang bersih, responsif, dan mudah digunakan oleh staf birokrasi tanpa memerlukan keahlian teknis:

* **Aturan Implementasi GUI**:
  * Menggunakan skema warna profesional birokrasi (Primary Blue `#1E3A8A`, Secondary Slate `#475569`, Accent Emerald `#059669`, Danger Red `#DC2626`).
  * Komponen UI mencakup: Dashboard Form Upload (Drag-and-Drop), Interactive Audit Mismatch Modal, Rich-Text Editor (WYSIWYG) untuk Naskah KAK, serta Interactive Grid/Table Editor untuk HPS.
  * Tampilan responsif untuk monitor desktop/laptop (Desktop First).

---

## 3. USER EXPERIENCE & ACCESS CONTROL (LOCAL SINGLE-USER)

Aplikasi dirancang sebagai **Single-User Standalone Desktop Application** tanpa membutuhkan proses login, autentikasi berbasis JWT, atau server otorisasi:

1. **Prinsip Bebas Login (No-Authentication)**: Pengguna yang membuka aplikasi di komputernya langsung mendapatkan akses penuh (*Full Editor Access*) ke seluruh fitur otomasi.
2. **Koneksi Internet Terisolasi**: Koneksi internet hanya digunakan **khusus** untuk panggilan outbound HTTPS ke **Gemini API (`google-genai` SDK)**. Seluruh pemrosesan PDF, kalkulasi Excel, manipulasi Word, dan pembuatan ZIP berjalan 100% offline secara lokal.
3. **Penyimpanan Konfigurasi Lokal**: API Key Gemini, referensi pejabat, serta histori penomoran disimpan dalam file konfigurasi lokal (`config.json` dan `Register_Arsip_Penomoran.json`) di folder instalasi aplikasi.

---

## 4. MODUL SPECIFICATION: INPUT ANCHORS & INPUT-OUTPUT LOGIC

### 4.1 Input Anchors (3 Berkas Utama Sebelum Bot Dijalankan)
Sistem membutuhkan **3 sumber input utama** sebelum eksekusi otomasi dimulai:

1. **`DPA_2026.pdf` (Dokumen Pelaksanaan Anggaran)**: File PDF resmi dari APBD yang memuat Kode Rekening MAK (`5.02.04.2.01.0002.5.1.02.02.009.00006`), Pagu Anggaran Maksimal (misal: Rp 90.000.000 atau Rp 100.000.000), Sub-Kegiatan, serta Identitas Pengguna Anggaran (PA Raden Roro Andarini, S.E., M.Si.).
2. **Draf KAK Mentah / Input AI Wizard (`.docx` / Interactive)**: Naskah draf KAK awal yang memuat urgensi, latar belakang, serta rincian kebutuhan Tenaga Ahli (S1/S2, jumlah Orang-Bulan) dan peralatan. Jika draf belum ada, pengguna dapat menggunakan *AI Conversational Wizard* di UI.
3. **Master Data Pejabat & Referensi SHBJ (`Data_Master_Pengadaan.xlsx` / `config.json`)**: File referensi lokal yang menyimpan NIP/Nama PA & PPK (Bambang Setyo Nugroho, S.ST.), tabel plafon Standar Harga Barang Jasa (SHBJ) Pemkot Yogyakarta, serta kode ID RUP SiRUP.

*(Catatan Penting: HPS **bukanlah input**, melainkan **OUTPUT** yang dihitung dan digenerate secara otomatis oleh sistem).*

### 4.2 Interactive Audit Engine (Handling Mismatch & Cross-Validation)
Python Engine membandingkan DPA vs KAK Mentah vs Plafon SHBJ secara otomatis sebelum dokumen dicetak:

1. **Rule 1: Over-Budget Protection**:
   * *Logika*: Total HPS kalkulasi bot > Pagu DPA.
   * *Aksi*: *Hard Block* / Peringatan Merah di UI. Sistem meminta penyesuaian volume/durasi atau pemberian justifikasi khusus.
2. **Rule 2: Mismatch Tenaga Ahli & Durasi (OB)**:
   * *Logika*: Kualifikasi atau jumlah Orang-Bulan (OB) Tenaga Ahli berbeda antara KAK dengan usulan anggaran.
   * *Aksi*: Modal Pop-Up muncul dengan 3 Opsi Keputusan: `[Gunakan Data KAK]`, `[Gunakan Data Master]`, atau `[Ketik Manual]`.
3. **Rule 3: Billing Rate & SHBJ Cap Enforcement**:
   * *Logika*: Tarif biaya personil atau non-personil melebihi plafon resmi SHBJ Pemkot Yogyakarta.
   * *Aksi*: Bot otomatis menyesuaikan tarif ke batas maksimal (*cap limit*) SHBJ dan memberi notifikasi penyesuaian.

---

## 5. MODUL SPECIFICATION: PROCUREMENT AUTOMATION ENGINE & OUTPUT GENERATION

### 5.1 Preview & Interactive Editor Phase
* **KAK Final (17 Poin Baku)**: Ditampilkan dalam **Rich-Text Editor (WYSIWYG)** di aplikasi desktop agar pengguna dapat meninjau dan menyempurnakan narasi hasil restrukturisasi AI.
* **HPS Spreadsheet Editor**: Ditampilkan dalam **Interactive Grid/Table Editor** di UI. Bot merekomendasikan tarif dari SHBJ, dan pengguna dapat menyesuaikan volume/satuan secara instan.

### 5.2 Output Generation (11 Dokumen Pra-Pengadaan Lengkap)
Sistem memproses dan menerbitkan **11 berkas pra-pengadaan resmi** yang dibungkus otomatis ke dalam **1 file `.zip`**:

| No | Nama Dokumen Output | Tipe Engine Pemroses | Format Terbit | Deskripsi & Komponen Utama Injeksi |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Surat Permohonan Pengadaan (JSS)** | *Template Variable Injection* | **.docx** & **.pdf** | Surat pelimpahan pengadaan ke Bagian Pengadaan, Kode MAK, Pagu Rp 90M/Rp 100M, NIP/Nama PA. |
| **2** | **Record Parsing DPA** | *Automated Regex Engine* (`pypdf`) | **.json** / State | Hasil ekstraksi otomatis Kode MAK `5.02.04...`, Pagu DPA, Sub-Kegiatan, & Nama PA. |
| **3** | **Payload Pendaftaran SiRUP** | *JSON Structuring Engine* | **.json** | Skema data isian pendaftaran paket RUP ke portal e-Procurement SiRUP LKPP. |
| **4** | **SK PPKOM / Pejabat Pengadaan** | *Template Variable Injection* | **.docx** & **.pdf** | SK Penunjukan Bambang Setyo Nugroho, S.ST. sebagai Pejabat Pengadaan dengan penomoran otomatis. |
| **5** | **KAK Final (17 Poin Baku)** | *AI Narrative Transformation* (Gemini) | **.docx** & **.pdf** | Restrukturisasi KAK ke 17 Poin Baku Pemkot (Latar Belakang, Ruang Lingkup, Matriks Tata Kala 90 Hari, Ahli, Hak IP). |
| **6** | **Rincian HPS & TKDN 100%** | *Python Spreadsheet Engine* (`openpyxl`) | **.xlsx** (Rumus) | Rincian Biaya Personil & Non-Personil dengan rumus aktif Excel, PPN 11%, dan skema 100% TKDN. |
| **7** | **Matriks Tata Kala Pelaksanaan** | *Dynamic Table Generator* | Injected / **.pdf** | Matriks tabel jadwal kegiatan 90 hari kalender (Mei–Juli) yang terintegrasi di KAK dan lampiran. |
| **8** | **Uraian Singkat Pekerjaan** | *AI Summarization Engine* | **.docx** & **.pdf** | Ringkasan eksekutif latar belakang, tujuan, dan output prototype digital financial dashboard. |
| **9** | **Rancangan SPK (Draf Kontrak)** | *Composite Variable Injection* | **.docx** & **.pdf** | Draf Kontrak Lump Sum (misal: Rp 97.641.150), Syarat Umum Kontrak (SSUK), durasi 90 hari, denda. |
| **10** | **Surat Rekomendasi Penyedia** | *Template Variable Injection* | **.docx** & **.pdf** | Format evaluasi dan validasi rekam jejak kinerja penyedia jasa. |
| **11** | **Bundel Berkas Output & Vault** | *Local Archival Engine* (`zipfile`) | **.zip** | Bundel lengkap seluruh dokumen (.docx, .pdf, .xlsx) + `Register_Arsip_Penomoran.json`. |

### 5.3 Penanganan Penformatan Dinamis & Structure Rules (Strict Layout Rule)
1. **Transparent Table Alignment (Invisible Borders)**:
   * Seluruh blok tanda tangan, header, dan KOP surat pada templat Word wajib dibungkus tabel transparan (`border=0`) agar posisi tanda tangan sejajar 100% dan tidak berantakan saat dibuka di berbagai versi Microsoft Word / PDF Viewer.
2. **Dynamic 17-Point KAK Rendering**:
   * Penanganan daftar bernomor (*numbered lists*), poin bertingkat (*bullet lists*), dan tabel bersarang (*nested tables*) pada KAK wajib di-render secara presisi menggunakan `python-docx` / HTML-to-OpenXML parser agar struktur alinea tetap rapi.
3. **Active Formula Retention in Excel**:
   * File HPS (`.xlsx`) tidak boleh memuat angka statis pada sel total. Wajib menggunakan rumus aktif Excel (contoh: `=SUM(E5:E20)`, `=E21*0.11`, `=E21+E22`) agar mudah diaudit oleh BPKAD.

---

## 6. LOCAL DATA DICTIONARY & CONFIGURATION SCHEMAS

### 6.1 `config.json` (Local System Configuration)
```json
{
  "app_name": "Procurement Automation Engine",
  "version": "2.0-Desktop",
  "gemini_api_key": "YOUR_GEMINI_API_KEY_HERE",
  "local_storage": {
    "templates_dir": "./templates",
    "output_dir": "./output_packages",
    "master_data_file": "./Data_Master_Pengadaan.xlsx",
    "register_json_file": "./Register_Arsip_Penomoran.json"
  },
  "default_defaults": {
    "tahun_anggaran": "2026",
    "kode_mak": "5.02.04.2.01.0002.5.1.02.02.009.00006",
    "ppn_rate": 0.11,
    "tkdn_target": 1.0
  }
}
```

### 6.2 `Register_Arsip_Penomoran.json` (Local Auto-Increment Registry)
```json
{
  "last_sk_number": 1,
  "last_spk_number": 1,
  "last_usp_number": 1,
  "registered_packages": [
    {
      "tahun": "2026",
      "kode_kajian": "KJ-01",
      "nama_paket": "Pajak-Hotel-BPKAD",
      "nomor_spk": "027/001.SPK/5.02.04/V/2026",
      "status": "ACC",
      "created_at": "2026-05-04T09:00:00"
    }
  ]
}
```

---

## 7. SECURITY, PERFORMANCE & FILE HANDLING

1. **Local Data Privacy**: Seluruh dokumen DPA, KAK, HPS, dan hasil cetak tersimpan 100% di hard disk lokal pengguna. Tidak ada data yang diunggah ke server cloud eksternal (kecuali prompt teks KAK ke Gemini API).
2. **Safe File Upload & Ingestion**: Validasi tipe file lokal (`.pdf`, `.docx`, `.xlsx`) dan batas ukuran file hingga 25MB.
3. **Async Generation & Zero-Lag UI**: Pemrosesan dokumen berat dikerjakan secara *asynchronous/multithreading* dengan *progress bar* di UI agar aplikasi desktop tidak mengalami *freeze* / *Not Responding*.

---

## 8. DEVELOPER TECH STACK & CODE STRUCTURE GUIDELINES

1. **Developer Tech Stack Freedom**: Developer (Mas Yoga & Tim) bebas menggunakan teknologi aplikasi desktop / lokal yang paling dikuasai (misalnya: Python Streamlit / CustomTkinter + PyInstaller `.exe`, Electron/Tauri + Python Backend, atau Localhost FastAPI).
2. **Clean & Modular Code Architecture**:
   * `/modules/extractor`: Ekstraksi DPA PDF & Parsing.
   * `/modules/audit`: Logika perbandingan KAK vs DPA vs SHBJ.
   * `/modules/ai_engine`: Integrasi Gemini API (`google-genai` SDK).
   * `/modules/injector`: Pengisian templat `.docx` & `.xlsx`.
   * `/modules/vault`: Penomoran otomatis & kompresi `.zip`.
3. **Dokumentasi & Self-Documenting Code**: Setiap fungsi wajib memiliki *type hints* dan komentar penjelas ringkas untuk memudahkan pemeliharaan mandiri.

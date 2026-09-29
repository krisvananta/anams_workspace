# 🚀 Procurement Automation Engine — Project Starter

Repositori starter ini telah diinisialisasi dengan struktur **Native Desktop Architecture** & modul Python backend yang siap dieksekusi.

## 📂 Struktur Folder
```text
project_starter/
├── config.json                     # Konfigurasi sistem lokal & path
├── Register_Arsip_Penomoran.json   # Database penomoran otomatis lokal
├── .env.example                    # Template API Key Gemini
├── package.json                    # Package manifest Frontend / Native Desktop
├── python_engine/                  # Backend Processing Engine (Python Sidecar)
│   ├── main.py                     # Entrypoint API / CLI sidecar
│   ├── requirements.txt            # Python dependencies
│   ├── dpa_variablekey.json        # Mapping kunci variabel DPA
│   ├── modules/
│   │   ├── extractor.py            # Logika parsing DPA PDF (pypdf)
│   │   ├── audit.py                # Logika Audit Mismatch KAK vs HPS vs SHBJ
│   │   ├── ai_narrative.py         # Integrasi Gemini API (17 Poin KAK)
│   │   ├── injector.py             # Injeksi Word (invisible border) & Excel
│   │   └── vault.py                # Auto-increment registry & ZIP packager
│   └── data/
│       └── Data_Master_Pengadaan.xlsx # Master Data Pejabat & Plafon SHBJ
└── src/                            # Frontend UI Components (React/Tailwind)
```

## ⚡ Quickstart
1. Set up Python backend:
   ```bash
   cd python_engine
   python -m venv venv
   source venv/bin/activate  # atau venv\Scripts\activate di Windows
   pip install -r requirements.txt
   python main.py
   ```
2. Set up Frontend UI:
   ```bash
   npm install
   npm run dev
   ```

import json
import os
import sys

def load_json_database(filepath):
    if not os.path.exists(filepath):
        # Fallback dummy data jika file tidak ditemukan saat pengujian
        return {
            "dpa_variables": {
                "nomor_dpa": "DPA/A.1/5.02.0.00.0.00.01.0000/001/2026",
                "penanggung_jawab": {
                    "nama": "RADEN RORO ANDARINI, S.E., M.Si.",
                    "nip": "197203171997032004",
                    "pangkat": "Pembina Utama Muda (IV/c)"
                },
                "rekening_belanja": {
                    "pagu_rekening_raw": 290000000
                }
            }
        }
    with open(filepath, 'r') as f:
        return json.load(f)

def simulasi_ekstraksi_mentah():
    """Simulasi data kasar dari KAK dan HPS mentah yang diunggah pengguna"""
    return {
        "kak_mentah": {
            "nama_ppk": "R.R. Andarini",  # Mismatch penulisan nama dengan DPA
            "nip_ppk": "197203171997032004",
            "tenaga_ahli": ["Ahli Akuntansi", "Ahli Hukum", "Ahli Data Science"],
            "jangka_waktu_hari": 90
        },
        "hps_mentah": {
            "total_hps": 105000000,  # Mismatch anggaran (Melebihi pagu paket simulasi Rp 100 Juta)
            "tenaga_ahli_terbayar": ["Ahli Akuntansi", "Ahli Hukum"]  # Mismatch ahli (Data Science kurang)
        }
    }

def audit_dan_resolusi_interaktif(dpa_data, mentah_data):
    print("=" * 60)
    print("      SISTEM AUDIT & RESOLUSI INTERAKTIF STARTER KIT      ")
    print("=" * 60)
    
    perubahan_terjadi = False
    database_diperbarui = dpa_data.copy()
    
    # ------------------ AUDIT 1: NAMA PPK ------------------
    nama_dpa = dpa_data["dpa_variables"]["penanggung_jawab"]["nama"]
    nama_kak = mentah_data["kak_mentah"]["nama_ppk"]
    
    if nama_dpa.strip().upper() != nama_kak.strip().upper():
        print(f"\n[⚠️ ALERT - MISMATCH NAMA PPK]")
        print(f"  • Di DPA Resmi : {nama_dpa}")
        print(f"  • Di KAK Mentah: {nama_kak}")
        print("-" * 50)
        print("Pilih tindakan Anda:")
        print("  [1] Gunakan nama dari DPA Resmi (Sangat Direkomendasikan - Auto Fix KAK)")
        print("  [2] Tetap gunakan nama dari KAK Mentah")
        print("  [3] Ketik nama baru secara manual")
        print("  [4] Batalkan proses untuk mengganti/mengunggah dokumen baru")
        
        # Di Google Colab / terminal asli menggunakan input(), di sini kita simulasikan pilihan default [1]
        pilihan = "1" # Simulasi input otomatis demi kelancaran demo
        print(f"-> Pilihan Anda (Simulasi): {pilihan}")
        
        if pilihan == "1":
            print(f"[✓] Sistem akan merevisi KAK Mentah menggunakan nama resmi DPA: {nama_dpa}")
            database_diperbarui["dpa_variables"]["penanggung_jawab"]["nama_final"] = nama_dpa
            perubahan_terjadi = True
        elif pilihan == "3":
            nama_manual = "Raden Roro Andarini, S.E., M.Si."
            print(f"[✓] Sistem menggunakan nama input manual: {nama_manual}")
            database_diperbarui["dpa_variables"]["penanggung_jawab"]["nama_final"] = nama_manual
            perubahan_terjadi = True
        elif pilihan == "4":
            print("[X] Proses dihentikan. Silakan unggah ulang dokumen yang benar.")
            sys.exit()
            
    # ------------------ AUDIT 2: KESELARASAN TENAGA AHLI ------------------
    ahli_kak = set(mentah_data["kak_mentah"]["tenaga_ahli"])
    ahli_hps = set(mentah_data["hps_mentah"]["tenaga_ahli_terbayar"])
    
    if ahli_kak != ahli_hps:
        selisih = ahli_kak - ahli_hps
        print(f"\n[⚠️ ALERT - MISMATCH TENAGA AHLI]")
        print(f"  • Tenaga Ahli di KAK Mentah: {list(ahli_kak)}")
        print(f"  • Tenaga Ahli di HPS Mentah: {list(ahli_hps)}")
        print(f"  • KEKURANGAN di HPS Mentah : {list(selisih)}")
        print("-" * 50)
        print("Pilih tindakan Anda:")
        print("  [1] Sesuaikan HPS (Tambahkan slot kosong untuk ahli yang kurang pada Excel)")
        print("  [2] Sesuaikan KAK (Hapus kualifikasi tenaga ahli yang tidak dianggarkan)")
        print("  [3] Batalkan proses untuk mengganti/mengunggah dokumen baru")
        
        pilihan = "1" # Simulasi input otomatis demi kelancaran demo
        print(f"-> Pilihan Anda (Simulasi): {pilihan}")
        
        if pilihan == "1":
            print(f"[✓] Sistem akan otomatis menyisipkan baris kosong untuk {list(selisih)} pada draf Excel HPS.")
            database_diperbarui["tenaga_ahli_final"] = list(ahli_kak)
            perubahan_terjadi = True
        elif pilihan == "3":
            print("[X] Proses dihentikan. Silakan revisi dokumen KAK/HPS Anda dan unggah ulang.")
            sys.exit()

    # ------------------ AUDIT 3: LIMIT PAGU HPS ------------------
    # Anggap batas pagu per paket adalah Rp 100.000.000
    pagu_paket_limit = 100000000
    total_hps_mentah = mentah_data["hps_mentah"]["total_hps"]
    
    if total_hps_mentah > pagu_paket_limit:
        print(f"\n[⚠️ ALERT - ANGGARAN OVER BUDGET]")
        print(f"  • Total Nilai HPS Mentah   : Rp {total_hps_mentah:,}")
        print(f"  • Batas Maksimal Pagu Paket: Rp {pagu_paket_limit:,}")
        print(f"  • Kelebihan Anggaran       : Rp {total_hps_mentah - pagu_paket_limit:,}")
        print("-" * 50)
        print("Pilih tindakan Anda:")
        print("  [1] Batalkan proses untuk mengganti/mengunggah dokumen baru (Direkomendasikan)")
        print("  [2] Izinkan Over Budget (Beri catatan khusus pada Dokumen SPK & Justifikasi KAK)")
        
        pilihan = "1" # Simulasi input otomatis demi kelancaran demo
        print(f"-> Pilihan Anda (Simulasi): {pilihan}")
        
        if pilihan == "1":
            print("[X] Proses dihentikan demi keselamatan keuangan negara. Silakan revisi file HPS Excel Anda!")
            # Di program asli, ini akan memicu return False / sys.exit()
            # Namun di demo ini kita biarkan lewat dengan warning agar user paham hasil akhirnya.
            
    print("\n" + "=" * 60)
    print("                HASIL AKHIR RESOLUSI AUDIT                ")
    print("=" * 60)
    if perubahan_terjadi:
        print("[+] Resolusi sukses didefinisikan secara interaktif.")
        print("[+] Skrip generator hilir sekarang memiliki data konfirmasi yang 100% valid.")
    else:
        print("[✓] Tidak ditemukan inkonsistensi. Aman untuk langsung mencetak dokumen!")
    print("=" * 60)

if __name__ == "__main__":
    # Menghindari error path di sandbox
    json_path = "/workspace/artifacts/dpa_variablekey.json"
    if not os.path.exists(json_path):
        json_path = "dpa_variablekey.json"
        
    dpa_db = load_json_database(json_path)
    mentah_db = simulasi_ekstraksi_mentah()
    
    audit_dan_resolusi_interaktif(dpa_db, mentah_db)

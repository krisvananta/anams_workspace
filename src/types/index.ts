/* ===================================================================
   TYPES — Procurement Automation Engine
   Based on PRD v2.0 & User Journey Specification
   =================================================================== */

/** Status dokumen per PRD Section 5 — Vault Management */
export type DocumentStatus = 'DRAFT' | 'ACC'

/** Package metadata from JSON schema in User Journey */
export interface PackageMetadata {
  tahun_anggaran: string
  kode_kajian: string
  nama_paket_singkat: string
  status_dokumen: DocumentStatus
}

/** Pejabat (Officials) from Data Master */
export interface Pejabat {
  pa_nama: string
  pa_nip: string
  ppk_nama: string
  ppk_nip: string
}

/** DPA extraction result from Python engine */
export interface DPAParseResult {
  kode_mak: string
  nama_pa: string
  nama_ppk: string
  pagu_dpa: number
  pagu_paket_hps: number
  nomor_dpa: string
  nama_sub_kegiatan: string
}

/** Audit mismatch item from audit engine */
export interface AuditIssue {
  id: string
  rule: 'OVER_BUDGET' | 'MISMATCH_TENAGA_AHLI' | 'SHBJ_CAP_EXCEEDED'
  severity: 'error' | 'warning' | 'info'
  target: string
  description: string
  kak_value?: string
  hps_value?: string
  shbj_limit?: number
  resolution?: 'USE_KAK' | 'USE_HPS' | 'MANUAL' | 'AUTO_ADJUST' | null
}

/** Document output item per PRD Section 5.2 */
export interface DocumentOutput {
  id: number
  kode_dokumen: string
  nama_dokumen: string
  tipe_engine: string
  format_terbit: string[]
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress: number
}

/** The 11 procurement documents defined in PRD */
export const PROCUREMENT_DOCUMENTS: Omit<DocumentOutput, 'status' | 'progress'>[] = [
  { id: 1, kode_dokumen: 'JSS', nama_dokumen: 'Surat Permohonan Pengadaan (JSS)', tipe_engine: 'Template Variable Injection', format_terbit: ['.docx', '.pdf'] },
  { id: 2, kode_dokumen: 'DPA-PARSE', nama_dokumen: 'Record Parsing DPA', tipe_engine: 'Automated Regex Engine', format_terbit: ['.json'] },
  { id: 3, kode_dokumen: 'SIRUP', nama_dokumen: 'Payload Pendaftaran SiRUP', tipe_engine: 'JSON Structuring Engine', format_terbit: ['.json'] },
  { id: 4, kode_dokumen: 'SK-PPKOM', nama_dokumen: 'SK PPKOM / Pejabat Pengadaan', tipe_engine: 'Template Variable Injection', format_terbit: ['.docx', '.pdf'] },
  { id: 5, kode_dokumen: 'KAK', nama_dokumen: 'KAK Final (17 Poin Baku)', tipe_engine: 'AI Narrative Transformation', format_terbit: ['.docx', '.pdf'] },
  { id: 6, kode_dokumen: 'HPS', nama_dokumen: 'Rincian HPS & TKDN 100%', tipe_engine: 'Python Spreadsheet Engine', format_terbit: ['.xlsx'] },
  { id: 7, kode_dokumen: 'TATA-KALA', nama_dokumen: 'Matriks Tata Kala Pelaksanaan', tipe_engine: 'Dynamic Table Generator', format_terbit: ['.pdf'] },
  { id: 8, kode_dokumen: 'USP', nama_dokumen: 'Uraian Singkat Pekerjaan', tipe_engine: 'AI Summarization Engine', format_terbit: ['.docx', '.pdf'] },
  { id: 9, kode_dokumen: 'SPK', nama_dokumen: 'Rancangan SPK (Draf Kontrak)', tipe_engine: 'Composite Variable Injection', format_terbit: ['.docx', '.pdf'] },
  { id: 10, kode_dokumen: 'REKOMENDASI', nama_dokumen: 'Surat Rekomendasi Penyedia', tipe_engine: 'Template Variable Injection', format_terbit: ['.docx', '.pdf'] },
  { id: 11, kode_dokumen: 'BUNDEL', nama_dokumen: 'Bundel Berkas Output & Vault', tipe_engine: 'Local Archival Engine', format_terbit: ['.zip'] },
]

/** Navigation menu item */
export interface NavItem {
  id: string
  label: string
  icon: string
  path: string
  badge?: string
}

/** App-wide pipeline step status */
export type PipelineStage =
  | 'idle'
  | 'input_master'
  | 'audit_mismatch'
  | 'ai_transformation'
  | 'template_injection'
  | 'vault_archival'
  | 'completed'

/** Health check response from Python sidecar */
export interface HealthCheckResponse {
  status: 'online' | 'offline'
  mode: string
}

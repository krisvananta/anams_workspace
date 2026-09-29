import os
import sys
from fastapi import FastAPI, UploadFile, File
from modules.extractor import parse_dpa_pdf
from modules.audit import check_audit_mismatch

app = FastAPI(title="Procurement Engine Sidecar", version="2.0.0")

@app.get("/health")
def health_check():
    return {"status": "online", "mode": "local_sidecar"}

@app.post("/api/parse-dpa")
async def parse_dpa(file: UploadFile = File(...)):
    temp_path = f"./temp_{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(await file.read())
    
    result = parse_dpa_pdf(temp_path)
    if os.path.exists(temp_path):
        os.remove(temp_path)
    return {"status": "success", "data": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

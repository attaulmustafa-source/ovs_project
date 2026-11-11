# NAVTTC Online Certificate Verification — Wireframe

Client-facing wireframe for the **Online Verification (OV) System**, matching the NAVTTC theme used by HRMS / TVET Testing wireframes.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Demo flows

### Public portal
- Home → QR verification or Certificate Number verification
- Demo verified cert: `NAVTTC/CERT/2024/004821`
- Demo not verified / revoked: `NAVTTC/CERT/2022/000887`

### Admin
- `/admin/login`
- Super Admin: `superadmin@navttc.gov.pk` / `Navttc@123`
- Admin: `admin.ov@navttc.gov.pk` / `Navttc@123`

## Screens covered
- Public verification home
- QR scan (simulated) + certificate number entry
- Verified / Not Verified result with download actions
- Admin login (NAVTTC split brand panel)
- Dashboard KPIs
- Verification activity + filters/export
- Reports
- Admin users & settings (Super Admin)
- Audit logs
"# ovs_project" 

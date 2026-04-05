# Google Sheets Setup Guide for TDiS Contact Form

## What This Does
Every contact form submission on the TDiS website will automatically add a new row to your Google Sheet with all inquiry details — name, email, phone, service, projects, message, etc.

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it: `TDiS Website Inquiries`
4. In **Row 1**, add these exact headers (one per column):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Company | Industry | Service | Scope | Projects Selected | Edit Requests | Custom Edits | Urgency | Budget | Comm. Preference | Heard From | Message | Attachments |

---

## Step 2 — Create the Google Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete all existing code in the editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp    || '',
      data.name         || '',
      data.email        || '',
      data.phone        || '',
      data.company      || '',
      data.industry     || '',
      data.service      || '',
      data.scope        || '',
      data.projects     || '',
      data.edit_checks  || '',
      data.edit_custom  || '',
      data.urgency      || '',
      data.budget       || '',
      data.comm_pref    || '',
      data.heard_from   || '',
      data.message      || '',
      data.attachments  || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({status:'success'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status:'error', message: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾) — name it anything (e.g. "TDiS Form Handler")

---

## Step 3 — Deploy the Script

1. Click **Deploy → New Deployment**
2. Click the ⚙️ gear icon next to "Select type" → choose **Web App**
3. Set:
   - **Description:** TDiS Contact Form Handler
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy**
5. Click **Authorize access** → Allow permissions
6. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## Step 4 — Add the URL to the Contact Page

Open `contact/index.html` and find this line near the top of the `<script>` block:

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```

Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with the URL you copied in Step 3.

---

## Step 5 — EmailJS Setup

1. Go to [emailjs.com](https://www.emailjs.com) → Sign Up (free)
2. **Add Email Service:**
   - Click **Email Services → Add New Service**
   - Choose **Gmail** (or your email provider)
   - Connect `info@tdis.co.in`
   - Copy the **Service ID** (e.g. `service_abc123`)
3. **Create Email Template:**
   - Click **Email Templates → Create New Template**
   - Paste this template body:

```
New Inquiry from TDiS Website
==============================
Time:        {{timestamp}}
Name:        {{name}}
Email:       {{email}}
Phone:       {{phone}}
Company:     {{company}}
Industry:    {{industry}}

SERVICE:     {{service}}
Scope:       {{scope}}
Projects:    {{projects}}
Edit Checks: {{edit_checks}}
Custom Edit: {{edit_custom}}

Urgency:     {{urgency}}
Budget:      {{budget}}
Contact Via: {{comm_pref}}
Heard From:  {{heard_from}}

MESSAGE:
{{message}}

Attachments: {{attachments}}
==============================
```

   - Set **To Email:** `info@tdis.co.in`
   - Set **Subject:** `New Inquiry – {{service}} – {{name}}`
   - Click **Save**
   - Copy the **Template ID** (e.g. `template_xyz789`)

4. **Get Public Key:**
   - Go to **Account → API Keys**
   - Copy your **Public Key**

5. **Update contact/index.html** — find these 3 lines:

```javascript
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

Replace with your actual values.

---

## Accessing Your Admin Sheet

- **URL:** [sheets.google.com](https://sheets.google.com) → open `TDiS Website Inquiries`
- **On phone:** Install the **Google Sheets** app → your sheet is there
- **Share with team:** Click Share → add colleague emails (Viewer or Editor access)
- **Filter by urgency:** Use the filter button on the header row
- **Add a Status column:** Add column R → manually mark `New / In Progress / Replied / Closed`
- **Export to Excel:** File → Download → Microsoft Excel (.xlsx)

---

## Summary of Keys to Replace

| File | Variable | What to paste |
|---|---|---|
| `contact/index.html` | `EMAILJS_PUBLIC_KEY` | From EmailJS Account → API Keys |
| `contact/index.html` | `EMAILJS_SERVICE_ID` | From EmailJS Email Services |
| `contact/index.html` | `EMAILJS_TEMPLATE_ID` | From EmailJS Email Templates |
| `contact/index.html` | `GOOGLE_SCRIPT_URL` | From Apps Script deployment URL |

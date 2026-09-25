import { writeFile } from 'node:fs/promises';

const payload = {
  primaryText: 'Summer Gala',
  headerLabelRight: 'Admit One',
  backgroundColor: '#0F1219',
  thumbnailURL: 'https://cdn.example.com/passes/gala.png',
  barcode: { format: 'qr', message: 'https://example.com/tickets/12345' },
};

const response = await fetch('https://app.addpass.io/api/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_KEY_HERE',
    'Content-Type': 'application/json',
    'Accept': 'application/pkpass',
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  throw new Error('Generation failed');
}

const buffer = Buffer.from(await response.arrayBuffer());
await writeFile('summer-gala.pkpass', buffer);
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client with standard telemetry headers
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Core API endpoints FIRST
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages format is invalid' });
    }

    if (!ai) {
      // Elegant mocked response fallback if Gemini API key isn't provided/set yet
      const lastMessage = messages[messages.length - 1]?.content || '';
      return res.json({
        text: `Halo! Saya Clara, Concierge AI Proptera. Saat ini kunci API (GEMINI_API_KEY) belum terpasang di panel rahasia Anda. \n\nSebagai contoh simulasi dari pertanyaan Anda "${lastMessage}", saya dapat menginformasikan bahwa portofolio Amarta Stone Reserve di Uluwatu saat ini ditawarkan dengan harga eksklusif Rp 24,5M sudah bersertifikat hak milik (SHM). Ada yang bisa saya bantu lebih lanjut?`
      });
    }

    // Adapt user messages to parts
    // Collect last message for prompt, feed historical contexts as text
    const contextPrompt = messages
      .map((msg: any) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contextPrompt + '\nAssistant:',
      config: {
        systemInstruction: `Anda adalah Clara, sebuah AI Concierge properti elit yang melayani Proptera.
Proptera adalah agen real estate mewah terkemuka di Indonesia dengan 3 karya unggulan:
1. Amarta Stone Reserve (Uluwatu, Bali - Rp 24,5 Miliar): Batu alam megah, view tebing laut, kolam renang air asin.
2. Komorebi Japandi Lodge (Dago, Bandung - Rp 12,8 Miliar): Kabin perpaduan kayu pinus-batu, udara pegunungan dingin, onsen tub.
3. Nirvana Waterfront Pavilion (Canggu, Bali - Rp 42 Miliar): Paviliun kaca futuristis terbentang di bibir pantai dengan infinity pool 25 meter.

Tugas Anda:
- Sambut pengunjung dengan sangat sopan, profesional, anggun, berkepribadian tenang ("Warm Editorial") dan bersahabat.
- Berikan analisis kalkulasi investasi jika ditanya tentang harga atau hitungan KPR.
- Gunakan Bahasa Indonesia yang ramah, ringkas, dan persuasif. Hindari jawaban yang terlalu panjang dan bertele-tele.
- Akhiri tanggapan Anda dengan menawarkan penjadwalan kunjungan atau chat WhatsApp langsung dengan spesialis kami.`,
        temperature: 0.75,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Error in API /api/chat:', error);
    res.status(500).json({ error: 'Gagal memproses permintaan AI.', details: error.message });
  }
});

// Mounting Vite dev server or static static assets mapping
async function setupBuildEngine() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Proptera Server] Running successfully on port ${PORT}`);
  });
}

setupBuildEngine();


import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '.env.local') });

// Verificar que las variables de entorno se cargaron correctamente
console.log('Variables de entorno cargadas:');
console.log('SMTP Host:', process.env.VITE_MAILEROO_SMTP_HOST);
console.log('SMTP Port:', process.env.VITE_MAILEROO_SMTP_PORT);
console.log('Email:', process.env.VITE_MAILEROO_EMAIL);
console.log('Sending Key disponible:', !!process.env.VITE_MAILEROO_SENDING_KEY);
console.log('Gemini API Key disponible:', !!process.env.GEMINI_API_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ====== Gemini File Search Chat ======
const GEMINI_MODEL = 'gemini-3-flash-preview';
const FILE_SEARCH_STORE_NAME = 'fileSearchStores/devpaul-portfolio-store';

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

async function ensureStoreAndDocument(ai) {
  try {
    const stores = [];
    for await (const s of ai.fileSearchStores.list()) {
      stores.push(s);
    }
    const existing = stores.find(s => s.name === FILE_SEARCH_STORE_NAME);
    const store = existing || await ai.fileSearchStores.create({ config: { displayName: 'devpaul-portfolio-store' } });

    const portfolioPath = path.join(__dirname, 'src', 'data', 'portfolio.ts');
    const docFile = path.join(__dirname, 'devpaul_portfolio_source.ts');

    if (fs.existsSync(portfolioPath)) {
      fs.copyFileSync(portfolioPath, docFile);
    } else {
      fs.writeFileSync(docFile, `
// DevPaul Portfolio Source
// Fallback document when src/data/portfolio.ts is not found.
// Include summary about projects, skills, and clients here.
      `.trim());
    }

    let op = await ai.fileSearchStores.uploadToFileSearchStore({
      file: docFile,
      fileSearchStoreName: store.name,
      config: { displayName: 'devpaul_portfolio_source.ts' }
    });

    while (!op.done) {
      await new Promise(r => setTimeout(r, 1500));
      op = await ai.operations.get({ operation: op });
    }

    return store;
  } catch (e) {
    console.error('Error preparando File Search Store:', e);
    throw e;
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Mensaje requerido' });
    }

    const ai = getAIClient();
    if (!ai) {
      return res.status(501).json({
        success: false,
        message: 'Configura GEMINI_API_KEY en .env.local para habilitar el chatbot'
      });
    }

    const store = await ensureStoreAndDocument(ai);

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: message,
      config: {
        tools: [
          {
            fileSearch: { fileSearchStoreNames: [store.name] }
          }
        ]
      }
    });

    const text = response?.text || '';
    return res.json({ success: true, reply: text });
  } catch (error) {
    console.error('Error en /api/chat:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor en chat' });
  }
});

// Endpoint para enviar correos
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validar campos requeridos
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Todos los campos son requeridos' 
    });
  }

  try {
    // Configurar el transportador de nodemailer con Maileroo
    // Según la documentación de Maileroo, debemos usar el correo electrónico completo como nombre de usuario
    const transporter = nodemailer.createTransport({
      host: process.env.VITE_MAILEROO_SMTP_HOST || 'smtp.maileroo.com',
      port: parseInt(process.env.VITE_MAILEROO_SMTP_PORT || '587'),
      secure: false, // false para puerto 587 (STARTTLS)
      auth: {
        user: process.env.VITE_MAILEROO_EMAIL || 'info@devpaul.pro',
        pass: (process.env.VITE_MAILEROO_API_KEY || '').trim()
      },
      tls: {
        rejectUnauthorized: false // Permitir certificados autofirmados
      }
    });
    
    // Verificar la conexión SMTP al iniciar el servidor
    transporter.verify(function(error, success) {
      if (error) {
        console.error('Error al verificar la conexión SMTP:', error);
      } else {
        console.log('Servidor SMTP listo para enviar mensajes');
      }
    });

    // Configurar el correo
    const mailOptions = {
      from: `"${name}" <${process.env.VITE_MAILEROO_EMAIL}>`,
      to: process.env.VITE_MAILEROO_EMAIL,
      replyTo: email,
      subject: `Contacto desde Portfolio: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            Nuevo mensaje desde tu portfolio
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Información del contacto:</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>Nota:</strong> Puedes responder directamente a este correo para contactar al remitente.
            </p>
          </div>
        </div>
      `,
      text: `
        Nuevo mensaje desde tu portfolio
        
        Información del contacto:
        Nombre: ${name}
        Email: ${email}
        Asunto: ${subject}
        
        Mensaje:
        ${message}
        
        Nota: Puedes responder directamente a este correo para contactar al remitente.
      `
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Correo enviado exitosamente'
    });

  } catch (error) {
    console.error('Error al enviar correo:', error);

    const isDev = process.env.NODE_ENV !== 'production';
    const errorMessage =
      isDev && error instanceof Error
        ? `Error al enviar correo: ${error.message}`
        : 'Error interno del servidor al enviar el correo';

    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor API ejecutándose en puerto ${PORT}`);
});

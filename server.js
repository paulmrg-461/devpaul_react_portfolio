
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
let cachedStoreName = null;

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

async function ensureStoreAndDocument(ai) {
  try {
    if (cachedStoreName) {
      console.log('Reusando File Search Store en memoria:', cachedStoreName);
      return { name: cachedStoreName };
    }

    const store = await ai.fileSearchStores.create({ config: { displayName: 'devpaul-portfolio-store' } });

    const portfolioPath = path.join(__dirname, 'src', 'data', 'portfolio.ts');
    const docFile = path.join(__dirname, 'devpaul-portfolio-source.txt');

    const content = fs.existsSync(portfolioPath)
      ? fs.readFileSync(portfolioPath, 'utf8')
      : `devpaul portfolio source\nprojects, skills, clients, and experience overview.`;
    fs.writeFileSync(docFile, content);

    let op = await ai.fileSearchStores.uploadToFileSearchStore({
      file: docFile,
      fileSearchStoreName: store.name,
      config: { displayName: 'devpaul-portfolio-source' }
    });

    while (!op.done) {
      await new Promise(r => setTimeout(r, 1500));
      op = await ai.operations.get({ operation: op });
    }

    cachedStoreName = store.name;
    console.log('File Search Store creado y cacheado:', cachedStoreName);

    return store;
  } catch (e) {
    console.error('Error preparando File Search Store:', e);
    throw e;
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, lang } = req.body || {};
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

    let store = null;
    try {
      store = await ensureStoreAndDocument(ai);
    } catch (_e) {
      store = null;
    }

    const isEnglish = String(lang || '').toLowerCase() === 'en';
    const persona = isEnglish
      ? [
          'Always respond in English and in first person.',
          'Your name is DevPaul.',
          'I have over 7 years of experience building web, mobile, desktop and enterprise systems.',
          'I am a full-stack developer and software solutions architect, specialized in Flutter, React, Angular, Vue, Python and Node.js.',
          'Projects include: Todo App with AI, Central de Aluminios del Valle (website + AI chatbot), CDA Popayán (vehicle inspection), Traffic Code app with fine-tuned AI on Law 769, School Manager, DevPaul Loans, Grupo Vista (CRM + OpenAI chatbot), and NaturaStay (reservation system with AI).',
          'Experience includes Consorcio Express Transmilenio with a custom computer vision model for automatic damage detection, and Sig Systems Inc. with real-time video surveillance using RTSP streams and WebSockets.',
          'Built Flutter apps (Android/Web) for CDA Panamericana SAS and deployed backends on AWS (EC2, Lambda, S3).',
          'Focus on clean architecture, SOLID, TDD and best practices — always prioritizing maintainable, scalable and secure code.',
          'Clients include MegaHogar, Grupo Vista SAS, CDA Panamericana, Farmacia Jirehfarma, Central de Aluminios del Valle, Consorcio Express and Sig Systems Inc.',
          'Offer end-to-end solutions: cross-platform apps, robust backends (Node.js / FastAPI), relational/non-relational databases, AI automations, intelligent chatbots and computer vision systems.',
          'When I lack specific data, I say so clearly and offer viable alternatives.',
          'Never say I am a language model nor talk about model training.'
        ].join(' ')
      : [
          'Responde siempre en español y en primera persona.',
          'Tu nombre es DevPaul.',
          'Tengo más de 7 años de experiencia desarrollando aplicaciones web, móviles, de escritorio y sistemas empresariales.',
          'Soy un desarrollador full-stack y arquitecto de soluciones de software, especializado en Flutter, React, Angular, Vue, Python y Node.js.',
          'Mis proyectos incluyen: Todo App con IA, Central de Aluminios del Valle (web + chatbot), CDA Popayán (registro vehicular), Código de Tránsito con IA afinada en la Ley 769, School Manager, DevPaul Loans, Grupo Vista (CRM + chatbot OpenAI), y NaturaStay (sistema de reservas con IA).',
          'He trabajado en Consorcio Express Transmilenio desarrollando un modelo propio de visión por computadora para detección automática de daños, golpes y abolladuras en vehículos.',
          'También participé en Black and Blue para Sig Systems Inc., un sistema avanzado de videovigilancia en tiempo real con detección de eventos usando streams RTSP, WebSockets y análisis en vivo.',
          'En CDA Panamericana SAS, construí una app en Flutter (Android y Web) para gestión de inspecciones vehiculares, reportes técnicos y recordatorios automáticos vía email, desplegada en AWS (EC2, Lambda, S3).',
          'Para Comunix SAS, desarrollé un chatbot con fine-tuning de modelos LLM en OpenAI, frontend en Flutter y WordPress, y backend en AWS — enfocado en el Sistema de Información Socioeconómica del Cauca.',
          'Trabajo con arquitectura limpia, principios SOLID, TDD y buenas prácticas de desarrollo — siempre priorizando código mantenible, escalable y seguro.',
          'He construido soluciones para clientes como MegaHogar, Grupo Vista SAS, CDA Panamericana, Farmacia Jirehfarma, Central de Aluminios del Valle, Consorcio Express y Sig Systems Inc., cubriendo retail, salud, automotriz, industrial, transporte y seguridad.',
          'Ofrezco desarrollo completo: desde apps móviles multiplataforma (Flutter) hasta backend robusto (Node.js / FastAPI), bases de datos relacionales y no relacionales, automatizaciones con IA, chatbots inteligentes y sistemas de visión artificial.',
          'Cuando no tenga información específica sobre algo, lo diré con claridad y ofreceré alternativas viables basadas en mi experiencia.',
          'Nunca mencionaré que soy un modelo de lenguaje ni hablaré de entrenamiento de modelos.'
        ].join(' ');

    const response = store
      ? await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: message,
          config: {
            systemInstruction: persona,
            tools: [
              {
                fileSearch: { fileSearchStoreNames: [store.name] }
              }
            ]
          }
        })
      : await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: message,
          config: {
            systemInstruction: persona
          }
        });

    const text = response.text || '';
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

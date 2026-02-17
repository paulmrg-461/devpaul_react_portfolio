const functions = require('firebase-functions/v2/https');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const GEMINI_MODEL = 'gemini-3-flash-preview';
let cachedStoreName = null;

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

async function ensureStoreAndDocument(ai) {
  try {
    if (cachedStoreName) {
      console.log('Reusing in-memory File Search Store:', cachedStoreName);
      return { name: cachedStoreName };
    }

    const store = await ai.fileSearchStores.create({ config: { displayName: 'devpaul-portfolio-store' } });

    const docFile = path.join(process.cwd(), 'devpaul-portfolio-source.txt');
    const content = 'DevPaul portfolio source: projects, skills, clients, and experience overview.';
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
    console.log('File Search Store created and cached:', cachedStoreName);

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
        message: 'Configura GEMINI_API_KEY como secreto en Firebase Functions'
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
          'My name is DevPaul.',
          'I have over 7 years of experience building web, mobile, desktop, and enterprise software solutions.',
          'I’m a full-stack developer and software architect specializing in Flutter, React, Angular, Vue, Python, and Node.js.',
          'My portfolio includes: Todo App with AI, Central de Aluminios del Valle (responsive website + AI chatbot), CDA Popayán (vehicle inspection app), Código de Tránsito (Colombian Traffic Law 769 fine-tuned AI app), School Manager, DevPaul Loans, Grupo Vista (CRM + OpenAI chatbot), and NaturaStay (booking system with real-time AI support).',
          'I developed a custom computer vision model for **Consorcio Express Transmilenio** to detect vehicle damage, dents, and impacts automatically using image analysis.',
          'I also built **Black and Blue** for Sig Systems Inc.—a real-time video surveillance system with live event detection using RTSP streams, WebSockets, and on-device analytics.',
          'For **CDA Panamericana SAS**, I built a Flutter (Android + Web) application for vehicle inspection management, technical reporting, and automated email reminders—deployed on AWS (EC2, Lambda, S3).',
          'At **Comunix SAS**, I engineered an AI-powered chatbot using OpenAI fine-tuning and LLM-based classification, with Flutter (mobile), WordPress (web), and a backend on AWS EC2 + Lambda + S3—supporting the Socioeconomic Information System of Cauca.',
          'I strictly follow Clean Architecture, SOLID principles, Test-Driven Development (TDD), and industry best practices—prioritizing maintainable, scalable, and secure code.',
          'I’ve delivered solutions for clients including MegaHogar, Grupo Vista SAS, CDA Panamericana, Farmacia Jirehfarma, Central de Aluminios del Valle, Consorcio Express, and Sig Systems Inc.—spanning retail, healthcare, automotive, industrial, transportation, and security sectors.',
          'I offer end-to-end development: cross-platform mobile apps (Flutter), robust backends (Node.js / FastAPI), relational & NoSQL databases, AI automation, intelligent chatbots, and real-time vision systems.',
          'If I lack specific information, I’ll state it clearly and propose practical alternatives based on my experience.',
          'I never mention being a language model or discuss training data.'
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

app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son requeridos'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.VITE_MAILEROO_SMTP_HOST || 'smtp.maileroo.com',
      port: parseInt(process.env.VITE_MAILEROO_SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.VITE_MAILEROO_EMAIL || 'info@devpaul.pro',
        pass: (process.env.VITE_MAILEROO_API_KEY || '').trim()
      },
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: `"${name}" <${process.env.VITE_MAILEROO_EMAIL}>`,
      to: process.env.VITE_MAILEROO_EMAIL,
      replyTo: email,
      subject: `Contacto desde Portfolio: ${subject}`,
      text: message
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al enviar el correo' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Cloud Function api viva' });
});

exports.api = functions.onRequest({
  cors: true,
  secrets: [
    'GEMINI_API_KEY',
    'VITE_MAILEROO_SMTP_HOST',
    'VITE_MAILEROO_SMTP_PORT',
    'VITE_MAILEROO_EMAIL',
    'VITE_MAILEROO_API_KEY'
  ]
}, app);

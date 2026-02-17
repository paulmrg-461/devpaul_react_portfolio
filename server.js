import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

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
        user: process.env.VITE_MAILEROO_EMAIL || 'info@devpaul.pro', // Usar correo electrónico completo
        pass: process.env.VITE_MAILEROO_SENDING_KEY.trim() // Asegurarse de que no haya espacios
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
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor al enviar el correo' 
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
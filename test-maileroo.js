import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '.env.local') });

// Mostrar las variables de entorno (sin mostrar la clave completa por seguridad)
console.log('Variables de entorno cargadas:');
console.log('SMTP Host:', process.env.VITE_MAILEROO_SMTP_HOST);
console.log('SMTP Port:', process.env.VITE_MAILEROO_SMTP_PORT);
console.log('Email:', process.env.VITE_MAILEROO_EMAIL);
console.log('Sending Key (primeros 5 caracteres):', process.env.VITE_MAILEROO_SENDING_KEY?.substring(0, 5));

async function testMaileroo() {
  try {
    // Configurar el transportador de nodemailer con Maileroo
    // Según la documentación de Maileroo, debemos usar el correo electrónico completo como nombre de usuario
    // Imprimir la clave de envío para verificar que se está cargando correctamente
    console.log('Sending Key completa:', process.env.VITE_MAILEROO_SENDING_KEY);
    
    const transporter = nodemailer.createTransport({
      host: process.env.VITE_MAILEROO_SMTP_HOST || 'smtp.maileroo.com',
      port: 587, // Volver al puerto 587 que es el recomendado
      secure: false,
      auth: {
        user: process.env.VITE_MAILEROO_EMAIL, // Usar correo electrónico completo
        pass: process.env.VITE_MAILEROO_SENDING_KEY.trim() // Asegurarse de que no haya espacios
      },
      debug: true,
      logger: true
    });

    // Verificar la conexión
    console.log('Verificando conexión SMTP...');
    const verifyResult = await transporter.verify();
    console.log('Conexión SMTP verificada:', verifyResult);

    // Enviar un correo de prueba
    console.log('Enviando correo de prueba...');
    const mailOptions = {
      from: `"Test Maileroo" <${process.env.VITE_MAILEROO_EMAIL}>`,
      to: process.env.VITE_MAILEROO_EMAIL, // Enviar a la misma dirección
      subject: 'Prueba de conexión Maileroo',
      text: 'Este es un correo de prueba para verificar la conexión con Maileroo.',
      html: '<p>Este es un correo de prueba para verificar la conexión con Maileroo.</p>'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente:', info.messageId);
    console.log('Vista previa URL:', nodemailer.getTestMessageUrl(info));

  } catch (error) {
    console.error('Error en la prueba de Maileroo:', error);
  }
}

// Ejecutar la prueba
testMaileroo();
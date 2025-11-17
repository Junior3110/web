# 📧 Configuración de EmailJS - Formulario de Contacto

## Paso 1: Crear cuenta en EmailJS

1. Ve a: https://www.emailjs.com/
2. Haz clic en "Sign Up" (Registrarse)
3. Usa tu correo: **cesardiazq10@gmail.com**
4. Verifica tu email

## Paso 2: Conectar tu Gmail

1. En el Dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **Gmail**
4. Haz clic en **"Connect Account"**
5. Autoriza con tu cuenta cesardiazq10@gmail.com
6. Copia el **Service ID** (algo como: service_abc123)

## Paso 3: Crear Template (Plantilla)

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura así:

**Template Content:**
```
Asunto: Nuevo mensaje de tu portafolio - {{subject}}

De: {{user_name}}
Email: {{user_email}}

Mensaje:
{{message}}
```

4. Haz clic en **"Save"**
5. Copia el **Template ID** (algo como: template_xyz789)

## Paso 4: Obtener tu Public Key

1. Ve a **"Account"** (en el menú superior)
2. Busca **"API Keys"** o **"Public Key"**
3. Copia tu **Public Key** (algo como: 8a7B_xYz123AbC)

## Paso 5: Actualizar el código

Abre el archivo: `c:\Webs\pagina\JAVASCRIPT\main.js`

Busca estas 3 líneas y reemplaza con tus datos:

```javascript
emailjs.init("TU_PUBLIC_KEY"); // Línea 2 - Pon tu Public Key

// Línea 23 - Reemplaza ambos IDs:
emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', form)
```

### Ejemplo de cómo quedaría:
```javascript
emailjs.init("8a7B_xYz123AbC");

emailjs.sendForm('service_abc123', 'template_xyz789', form)
```

## ✅ ¡Listo!

Después de esto, cuando alguien envíe el formulario:
- ✉️ Te llegará un email a **cesardiazq10@gmail.com**
- 📝 Con el nombre, email y mensaje de la persona
- 🎯 Podrás responderles directamente

## 🆓 Plan Gratuito

- 200 emails por mes gratis
- Perfecto para tu portafolio

## 🆘 Si tienes problemas

- Revisa la consola del navegador (F12) para ver errores
- Verifica que los IDs estén bien copiados (sin espacios)
- Asegúrate de que tu email esté verificado en EmailJS

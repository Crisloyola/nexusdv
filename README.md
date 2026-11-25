# NEXUSDV · Web en Next.js

Web de NEXUSDV (webs, apps, sistemas, dominios y correo corporativo) hecha con **Next.js 15 + React 19 + TypeScript**.
Diseño bento grid, vidrio estriado animado, carrusel de proyectos y asistente de chat.

---

## 1. Requisitos

- **Node.js 20 o superior** → https://nodejs.org (instala la versión LTS)
- Un editor, por ejemplo **Visual Studio Code**

## 2. Correr la web en tu computadora

```bash
npm install        # instala todo (solo la primera vez)
npm run dev        # abre http://localhost:3000
```

Cada vez que guardes un archivo, la página se actualiza sola.

Para probar la versión final, como quedará publicada:

```bash
npm run build
npm start
```

## 3. Estructura del proyecto

```
nexusdv-web/
├── app/
│   ├── layout.tsx          ← título, descripción para Google/WhatsApp, fuente
│   ├── page.tsx            ← arma la página: une todas las secciones en orden
│   ├── globals.css         ← todos los estilos (colores, bento, animaciones)
│   ├── fonts/              ← fuente Schibsted Grotesk
│   └── api/chat/route.ts   ← asistente con IA (opcional, ver punto 6)
│
├── components/
│   ├── Header.tsx          ← menú de arriba
│   ├── Hero.tsx            ← inicio: título, mensajes animados y 4 bloques
│   ├── Servicios.tsx       ← webs, apps, sistemas, dominio, correo, WhatsApp, Google
│   ├── Proyectos.tsx       ← carrusel de proyectos entregados
│   ├── Pasos.tsx           ← "Tu proyecto en 3 pasos"
│   ├── Precios.tsx         ← planes y preguntas frecuentes
│   ├── Contacto.tsx        ← WhatsApp, correo, Instagram y cierre
│   ├── Footer.tsx          ← pie de página y botón fijo de WhatsApp en celular
│   ├── Asistente.tsx       ← botón y ventana del chat
│   ├── FlutedGlass.tsx     ← bloque con vidrio estriado animado
│   ├── Tile.tsx            ← bloque del bento (con luz que sigue al mouse)
│   ├── CountUp.tsx         ← números que suben (24/7, 100%, S/ 550)
│   ├── RevealInit.tsx      ← animación de entrada al hacer scroll
│   ├── Icons.tsx           ← íconos y logo
│   └── mocks/Mocks.tsx     ← mini pantallas animadas (chat, checklist, app, panel…)
│
├── lib/
│   ├── data.ts             ← ⭐ TEXTOS Y DATOS: contacto, proyectos, precios, preguntas
│   ├── bot.ts              ← ⭐ respuestas del asistente
│   └── useLoop.ts          ← animaciones en bucle solo cuando se ven en pantalla
│
├── public/
│   ├── img/                ← capturas de los proyectos
│   ├── fx/                 ← efecto de vidrio estriado (no tocar)
│   ├── favicon.svg
│   └── share.jpg           ← imagen que sale al compartir el link
│
└── .env.example            ← variables para activar la IA
```

## 4. Cambios más comunes

| Quiero…                              | Edito                                    |
|--------------------------------------|------------------------------------------|
| Cambiar WhatsApp, correo o Instagram | `lib/data.ts` → `contacto`               |
| Agregar un proyecto al carrusel      | `lib/data.ts` → `proyectos` + imágenes en `public/img/` |
| Cambiar precios o lo que incluye     | `lib/data.ts` → `planes`                 |
| Agregar o editar preguntas           | `lib/data.ts` → `preguntas`              |
| Cambiar lo que responde el asistente | `lib/bot.ts`                             |
| Cambiar colores                      | `app/globals.css` → `:root` (ej. `--lime`) |
| Cambiar el título de Google          | `app/layout.tsx` → `metadata`            |

**Agregar un proyecto:** copia uno de los objetos de `proyectos` en `lib/data.ts`, cambia los textos
y pon dos capturas en `public/img/`: una de computadora (1300×860 aprox.) y una de celular (vertical).
El carrusel, el contador y los puntitos se actualizan solos.

## 5. Publicar en Vercel (gratis)

1. Sube esta carpeta a un repositorio en **GitHub**.
2. Entra a https://vercel.com, inicia sesión con GitHub y elige **Add New → Project**.
3. Selecciona el repositorio y pulsa **Deploy**. No hace falta cambiar nada.
4. Para usar tu dominio: en el proyecto de Vercel ve a **Settings → Domains**, agrega `nexusdv.com`
   y copia los registros DNS que te muestra en el panel donde compraste el dominio.

Cada vez que subas cambios a GitHub, Vercel publica la nueva versión solo.

## 6. Asistente: sin IA o con IA

**Sin IA (por defecto, gratis):** responde con los textos de `lib/bot.ts` y reconoce palabras clave
(precio, app, correo, dominio, sistema…). Siempre ofrece "Hablar por WhatsApp" con un mensaje
ya escrito según lo que preguntó el cliente.

**Con IA:** las preguntas escritas las responde un modelo de IA con la información de `lib/data.ts`
(`infoNegocio`). Los botones de opciones siguen usando las respuestas fijas.

1. Crea una clave en https://console.anthropic.com (se paga por uso; cada respuesta cuesta fracciones de centavo).
2. En Vercel → **Settings → Environment Variables** agrega:
   - `NEXT_PUBLIC_CHAT_IA` = `true`
   - `ANTHROPIC_API_KEY` = tu clave
   - (opcional) `CHAT_MODEL` = el modelo que quieras usar (por defecto `claude-haiku-5-5`)
3. Vuelve a publicar (Deployments → Redeploy).

Para probarlo en tu computadora, copia `.env.example` como `.env.local` y llena los valores.

- La clave **nunca** llega al navegador: solo la usa `app/api/chat/route.ts` en el servidor.
- Si la IA falla o no está configurada, el asistente responde automáticamente en modo sin IA.
- Recomendado: en la consola de Anthropic pon un **límite de gasto mensual**.

## 7. Notas

- Las animaciones se detienen cuando el bloque no está en pantalla y se desactivan si el usuario
  tiene activado "reducir movimiento" en su teléfono o computadora.
- El vidrio estriado usa WebGL. Si un navegador no lo soporta, se ve un fondo verde de respaldo.
- Las capturas de Creatrix son una recreación de su pantalla de inicio; reemplázalas por capturas
  reales con el mismo nombre de archivo cuando las tengas.

## 8. Suscripciones por correo

El formulario envía un aviso a `contacto@nexusdv.pe` y un mensaje de bienvenida al suscriptor usando
el buzón de NEXUSDV en Hostinger. No se guarda una lista en una base de datos: cada registro queda
en el correo de contacto para gestionarlo manualmente.

Configura estas variables en Vercel → **Settings → Environment Variables** y vuelve a publicar:

- `SMTP_HOST`, `SMTP_PORT` y `SMTP_SECURE`: datos SMTP que aparecen en Hostinger hPanel.
- `SMTP_USER`: el buzón autenticado (por ejemplo, `contacto@nexusdv.pe`).
- `SMTP_PASSWORD`: contraseña de ese buzón. No la publiques ni la compartas por el chat.

Para probar en local, agrega esos valores a `.env.local` (nunca al repositorio). Si luego quieres
enviar campañas a toda la lista, conecta un servicio de email marketing con bajas y gestión de
suscriptores; la bandeja de entrada por sí sola no administra campañas.
# nexusdv

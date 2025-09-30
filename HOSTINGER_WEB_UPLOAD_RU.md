# 🌐 Быстрая загрузка на Hostinger через веб-интерфейс

## Вариант для обычного хостинга (без SSH)

Этот метод работает для Hostinger Business/Premium с поддержкой Node.js или для статического экспорта.

---

## Шаг 1: Подготовка файлов на компьютере

### Откройте PowerShell и выполните:

```powershell
cd C:\Users\zaice\Desktop\dld\alpha

# Соберите проект для production
npm run build

# Создайте ZIP архив с проектом
# Установите 7-Zip если нет: https://7-zip.org
```

### Или создайте ZIP вручную:

1. Откройте папку `C:\Users\zaice\Desktop\dld\alpha`
2. Выберите все файлы (Ctrl+A)
3. Правый клик → Отправить → Сжатая ZIP-папка
4. Назовите: `alpha-star-properties.zip`

---

## Шаг 2: Войдите в Hostinger hPanel

1. Откройте: https://hpanel.hostinger.com
2. Войдите в аккаунт
3. Выберите ваш хостинг

---

## Шаг 3: Загрузка через File Manager

### Вариант А: Через File Manager (рекомендуется)

1. В hPanel нажмите **File Manager**
2. Перейдите в папку `/public_html/`
3. Нажмите **Upload Files** (кнопка вверху)
4. Выберите `alpha-star-properties.zip`
5. Дождитесь завершения загрузки
6. Правый клик на ZIP → **Extract** (Распаковать)
7. Файлы должны быть в `/public_html/`, а НЕ в `/public_html/alpha-star-properties/`

### Вариант Б: Через FTP (FileZilla)

1. Скачайте FileZilla: https://filezilla-project.org
2. В hPanel → **FTP Accounts** → найдите данные для подключения
3. В FileZilla подключитесь:
   - Host: ftp.ваш-сайт.com
   - Username: ваш FTP логин
   - Password: ваш FTP пароль
   - Port: 21
4. Перейдите в папку `/public_html/`
5. Перетащите все файлы из локальной папки проекта

---

## Шаг 4: Настройка Node.js приложения

### Если у вас есть Node.js в тарифе:

1. В hPanel → **Advanced** → **Node.js**
2. Нажмите **Setup Node.js Application**
3. Заполните:
   - **Node.js version:** 18.x
   - **Application mode:** production
   - **Application root:** `/public_html`
   - **Application startup file:** `server.js`
   - **Passenger log file:** оставьте по умолчанию

4. Нажмите **Create**

### Создайте файл server.js:

1. В File Manager → `/public_html/`
2. Нажмите **New File** → назовите `server.js`
3. Откройте файл и вставьте:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
```

4. Сохраните файл

---

## Шаг 5: Установка зависимостей

1. В hPanel → **Node.js** → найдите ваше приложение
2. Нажмите **Run NPM Install**
3. Дождитесь завершения (2-5 минут)

---

## Шаг 6: Настройка переменных окружения

1. В разделе **Node.js** → **Environment Variables**
2. Добавьте переменные (нажимайте **Add Variable**):

```
Name: NEXT_PUBLIC_WHATSAPP_NUMBER
Value: 971501234567

Name: NEXT_PUBLIC_SITE_URL
Value: https://alphastardubai.ae

Name: NODE_ENV
Value: production
```

3. Сохраните

---

## Шаг 7: Создание .env.local через File Manager

1. В File Manager → `/public_html/`
2. Нажмите **New File** → назовите `.env.local`
3. Откройте файл и вставьте:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567
NEXT_PUBLIC_SITE_URL=https://alphastardubai.ae
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
HUBSPOT_API_KEY=pat-na1-xxxxx
WEBHOOK_URL=https://your-webhook-url.com/endpoint
```

4. Сохраните

---

## Шаг 8: Запуск приложения

1. В hPanel → **Node.js** → найдите приложение
2. Нажмите **Start Application**
3. Дождитесь статуса **Running**

---

## Альтернатива: Статический экспорт (для обычного хостинга)

Если Node.js недоступен, используйте статический экспорт:

### На вашем компьютере:

```powershell
cd C:\Users\zaice\Desktop\dld\alpha

# Измените next.config.js
# Откройте файл в редакторе и измените:
```

Замените содержимое `next.config.js`:
```javascript
const withNextIntl = require('next-intl/plugin')(
  './src/i18n/request.ts'
);

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = withNextIntl(nextConfig);
```

```powershell
# Соберите статический сайт
npm run build

# Папка "out" будет содержать готовый сайт
```

### Загрузка на Hostinger:

1. В File Manager → `/public_html/`
2. **Удалите всё** из папки
3. Загрузите всё содержимое папки `out`
4. Убедитесь что `index.html` в корне `/public_html/`

### Создайте .htaccess:

1. В File Manager → New File → `.htaccess`
2. Вставьте:

```apache
RewriteEngine On

# HTTPS redirect
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Clean URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## Шаг 9: Проверка работы

1. Откройте ваш сайт: `https://alphastardubai.ae`
2. Проверьте переключение языков
3. Проверьте формы
4. Проверьте WhatsApp кнопку

---

## Обновление сайта

### Для Node.js приложения:

1. Соберите проект локально: `npm run build`
2. Через File Manager загрузите обновленные файлы
3. В Node.js разделе нажмите **Restart Application**

### Для статического экспорта:

1. Соберите проект: `npm run build`
2. Удалите содержимое `/public_html/`
3. Загрузите новые файлы из папки `out`

---

## Проблемы и решения

### Ошибка 500 Internal Server Error

**Решение 1:** Проверьте права доступа
- В File Manager выделите все файлы
- Правый клик → Permissions
- Установите: 644 для файлов, 755 для папок

**Решение 2:** Проверьте .htaccess
- Временно переименуйте `.htaccess` в `.htaccess.bak`
- Проверьте, работает ли сайт

### Node.js приложение не запускается

1. Проверьте логи в hPanel → Node.js → View Logs
2. Убедитесь что выполнен `npm install`
3. Проверьте что `server.js` существует
4. Перезапустите приложение

### Сайт открывается, но стили не загружаются

1. Проверьте что папки `_next` и `assets` загружены
2. Очистите кэш браузера (Ctrl+F5)
3. Проверьте консоль браузера (F12) на ошибки

### "Module not found" ошибки

```powershell
# На локальном компьютере:
cd C:\Users\zaice\Desktop\dld\alpha
rm -rf node_modules
rm package-lock.json
npm install
npm run build

# Загрузите заново все файлы включая node_modules
```

---

## Полезные советы

### 1. Сжатие файлов перед загрузкой

Используйте ZIP для больших папок:
- `node_modules` → загрузите как ZIP и распакуйте на сервере
- Экономит время загрузки

### 2. Проверка размера хостинга

В hPanel → проверьте использование дискового пространства
- Next.js проект занимает ~200-500 MB

### 3. Резервные копии

В hPanel → **Backups** → создайте бэкап перед большими изменениями

### 4. Ускорение сайта

В hPanel → **Speed** → включите:
- **Cloudflare CDN** (бесплатно)
- **Brotli compression**
- **HTTP/2**

---

## Видео-инструкция от Hostinger

Полезные видео:
- Как загружать файлы: https://www.youtube.com/hostinger
- Настройка Node.js: https://support.hostinger.com/en/articles/5617903

---

## Контакты поддержки

**Hostinger Support:**
- 24/7 Live Chat в hPanel
- Email: support@hostinger.com
- База знаний: https://support.hostinger.com

---

## Чек-лист перед запуском

- [ ] Файлы загружены в `/public_html/`
- [ ] Если Node.js: `npm install` выполнен
- [ ] Если Node.js: приложение запущено (Status: Running)
- [ ] Переменные окружения настроены
- [ ] `.env.local` создан с настройками
- [ ] SSL сертификат активен (зеленый замок)
- [ ] Сайт открывается по домену
- [ ] Все 3 языка работают
- [ ] Формы отправляются
- [ ] WhatsApp кнопка работает

---

**Готово!** Ваш сайт на Hostinger работает! 🎉

**Рекомендация:** Если у вас Simple/Start хостинг без Node.js - используйте статический экспорт. Для полной функциональности рекомендуется VPS или Cloud тариф.

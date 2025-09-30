# 🚀 Развертывание на Hostinger

## Важно! Проверьте ваш тариф

Next.js требует Node.js поддержку. Проверьте ваш план Hostinger:

- ✅ **VPS хостинг** - полная поддержка (рекомендуется)
- ✅ **Cloud хостинг** - поддержка Node.js
- ⚠️ **Shared хостинг (Business/Premium)** - ограниченная поддержка
- ❌ **Shared хостинг (Single/Start)** - НЕ поддерживается

---

## Вариант 1: Hostinger VPS (Рекомендуется)

### Шаг 1: Подключение к серверу

1. Войдите в **hPanel** (Hostinger панель)
2. Найдите раздел **VPS**
3. Нажмите **SSH Access**
4. Скопируйте данные для подключения:
   - IP адрес
   - SSH порт (обычно 22)
   - Пароль root

### Шаг 2: Подключение через SSH

**Вариант А: Через PuTTY (Windows)**

1. Скачайте PuTTY: https://putty.org
2. Запустите PuTTY
3. Введите:
   - Host Name: ваш IP
   - Port: 22
4. Нажмите **Open**
5. Введите логин: `root`
6. Введите пароль

**Вариант Б: Через PowerShell**

```powershell
ssh root@ваш-ip-адрес
# Введите пароль
```

### Шаг 3: Установка необходимого ПО

```bash
# Обновление системы
apt update && apt upgrade -y

# Установка Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Проверка версии
node --version  # должно быть v18.x
npm --version

# Установка PM2 (для автозапуска)
npm install -g pm2

# Установка Git
apt install -y git

# Установка Nginx
apt install -y nginx

# Установка SSL (Certbot)
apt install -y certbot python3-certbot-nginx
```

### Шаг 4: Загрузка проекта

**Способ 1: Через Git (рекомендуется)**

```bash
# Создайте папку для сайта
mkdir -p /var/www
cd /var/www

# Клонируйте репозиторий
git clone https://github.com/ВАШ_USERNAME/alpha-star-properties.git
cd alpha-star-properties

# Установите зависимости
npm install
```

**Способ 2: Через FileZilla (FTP)**

1. Скачайте FileZilla: https://filezilla-project.org
2. Подключитесь к серверу:
   - Протокол: SFTP
   - Хост: ваш IP
   - Порт: 22
   - Логин: root
   - Пароль: ваш пароль
3. Загрузите папку проекта в `/var/www/alpha-star-properties`

### Шаг 5: Настройка проекта

```bash
cd /var/www/alpha-star-properties

# Создайте файл с переменными окружения
nano .env.local
```

Вставьте:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567
NEXT_PUBLIC_SITE_URL=https://alphastardubai.ae
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
HUBSPOT_API_KEY=pat-na1-xxxxx
WEBHOOK_URL=https://your-webhook-url.com/endpoint
```

Сохраните: `Ctrl+X`, затем `Y`, затем `Enter`

```bash
# Соберите проект
npm run build

# Проверьте, что сборка прошла успешно
ls -la .next
```

### Шаг 6: Запуск приложения

```bash
# Запустите через PM2
pm2 start npm --name "alpha-star" -- start

# Настройка автозапуска
pm2 startup
pm2 save

# Проверка статуса
pm2 status
pm2 logs alpha-star

# Полезные команды PM2:
pm2 restart alpha-star   # Перезапуск
pm2 stop alpha-star      # Остановка
pm2 delete alpha-star    # Удаление
```

### Шаг 7: Настройка Nginx

```bash
# Создайте конфигурацию для вашего сайта
nano /etc/nginx/sites-available/alphastardubai.ae
```

Вставьте:
```nginx
server {
    listen 80;
    server_name alphastardubai.ae www.alphastardubai.ae;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Активируйте конфигурацию
ln -s /etc/nginx/sites-available/alphastardubai.ae /etc/nginx/sites-enabled/

# Проверьте конфигурацию
nginx -t

# Перезапустите Nginx
systemctl restart nginx
```

### Шаг 8: Настройка SSL сертификата

```bash
# Установите SSL
certbot --nginx -d alphastardubai.ae -d www.alphastardubai.ae

# Следуйте инструкциям:
# 1. Введите email
# 2. Согласитесь с условиями (Y)
# 3. Выберите вариант 2 (redirect HTTP to HTTPS)

# Автообновление сертификата
certbot renew --dry-run
```

### Шаг 9: Настройка DNS в Hostinger

1. В **hPanel** → **Domains**
2. Выберите ваш домен
3. Нажмите **DNS / Name Servers**
4. Добавьте/измените записи:

```
Type    Name    Value               TTL
A       @       ваш-VPS-IP          14400
A       www     ваш-VPS-IP          14400
```

### ✅ Готово!

Ваш сайт работает на `https://alphastardubai.ae`

---

## Вариант 2: Hostinger Cloud хостинг с Node.js

### Шаг 1: Включение Node.js

1. В **hPanel** → выберите ваш хостинг
2. Найдите **Advanced** → **Node.js**
3. Нажмите **Setup Node.js App**
4. Настройте:
   - Node.js version: **18.x**
   - Application mode: **production**
   - Application root: `/public_html/alpha-star`
   - Application URL: ваш домен
   - Application startup file: `server.js`

### Шаг 2: Загрузка файлов

1. В hPanel → **File Manager**
2. Перейдите в `/public_html/`
3. Создайте папку `alpha-star`
4. Загрузите все файлы проекта (можно через FTP или ZIP)

### Шаг 3: Установка зависимостей

В hPanel → **Advanced** → **Node.js App** → нажмите **NPM Install**

Или через SSH:
```bash
cd ~/public_html/alpha-star
npm install
npm run build
```

### Шаг 4: Создание startup файла

Создайте файл `server.js` в корне проекта:

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

### Шаг 5: Настройка переменных окружения

В hPanel → Node.js App → **Environment Variables**:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567
NEXT_PUBLIC_SITE_URL=https://alphastardubai.ae
NODE_ENV=production
```

### Шаг 6: Запуск приложения

В hPanel → Node.js App → нажмите **Start/Restart**

---

## Вариант 3: Статический экспорт (Shared хостинг)

⚠️ **Внимание:** Этот метод имеет ограничения:
- Не работают API routes
- Не работает ISR
- Только статические страницы

### Шаг 1: Подготовка статического экспорта

На вашем компьютере:

```bash
cd C:\Users\zaice\Desktop\dld\alpha

# Измените next.config.js
```

Добавьте в `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ... остальные настройки
};
```

```bash
# Соберите статический сайт
npm run build

# Будет создана папка "out" со статическими файлами
```

### Шаг 2: Загрузка на Hostinger

1. В **hPanel** → **File Manager**
2. Перейдите в `/public_html/`
3. Удалите все содержимое
4. Загрузите все файлы из папки `out`
5. Проверьте, что `index.html` находится в корне `/public_html/`

### Шаг 3: Настройка .htaccess

Создайте файл `.htaccess` в `/public_html/`:

```apache
# Включение mod_rewrite
RewriteEngine On

# Редирект на HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Поддержка чистых URL
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Кэширование
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## Обновление сайта

### Для VPS/Cloud:

```bash
# Подключитесь по SSH
ssh root@ваш-ip

cd /var/www/alpha-star-properties

# Получите последние изменения
git pull

# Обновите зависимости (если нужно)
npm install

# Пересоберите проект
npm run build

# Перезапустите приложение
pm2 restart alpha-star

# Или для Cloud хостинга:
# В hPanel → Node.js → Restart
```

### Для статического экспорта:

```bash
# На вашем компьютере:
npm run build

# Загрузите новые файлы из папки "out" через File Manager
```

---

## Проверка работы

### 1. Проверьте доступность:
```
https://alphastardubai.ae
```

### 2. Проверьте SSL:
- Должен быть зеленый замок в браузере

### 3. Проверьте все языки:
```
https://alphastardubai.ae/en
https://alphastardubai.ae/ar
https://alphastardubai.ae/ru
```

### 4. Проверьте формы и WhatsApp

---

## Мониторинг на VPS

### Проверка логов:

```bash
# Логи приложения
pm2 logs alpha-star

# Логи Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Использование ресурсов
pm2 monit
htop
```

### Автоматический мониторинг:

```bash
# Установите PM2 Web Dashboard
pm2 install pm2-server-monit
```

---

## Резервное копирование

### Автоматический бэкап на VPS:

```bash
# Создайте скрипт бэкапа
nano /root/backup.sh
```

Вставьте:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
PROJECT_DIR="/var/www/alpha-star-properties"

mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/alpha-star-$DATE.tar.gz $PROJECT_DIR

# Удалить бэкапы старше 7 дней
find $BACKUP_DIR -type f -mtime +7 -delete
```

```bash
# Сделайте скрипт исполняемым
chmod +x /root/backup.sh

# Добавьте в cron (ежедневно в 2:00)
crontab -e

# Добавьте строку:
0 2 * * * /root/backup.sh
```

---

## Оптимизация производительности

### 1. Настройка кэширования в Nginx:

Добавьте в конфигурацию сайта:
```nginx
location /_next/static/ {
    alias /var/www/alpha-star-properties/.next/static/;
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location /assets/ {
    alias /var/www/alpha-star-properties/public/assets/;
    expires 1y;
    add_header Cache-Control "public";
}
```

### 2. Увеличение лимитов PM2:

```bash
pm2 start npm --name "alpha-star" \
  --max-memory-restart 500M \
  --node-args="--max-old-space-size=512" \
  -- start
```

---

## Решение проблем

### Сайт не открывается:

```bash
# Проверьте статус приложения
pm2 status

# Проверьте логи
pm2 logs alpha-star --lines 50

# Проверьте Nginx
systemctl status nginx
nginx -t
```

### Ошибка "Cannot find module":

```bash
cd /var/www/alpha-star-properties
rm -rf node_modules .next
npm install
npm run build
pm2 restart alpha-star
```

### SSL не работает:

```bash
# Обновите сертификат
certbot renew --force-renewal
systemctl reload nginx
```

### Недостаточно памяти на VPS:

```bash
# Создайте SWAP файл (1GB)
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

---

## Полезные ссылки

- **Hostinger документация:** https://support.hostinger.com
- **Hostinger hPanel:** https://hpanel.hostinger.com
- **PM2 документация:** https://pm2.keymetrics.io
- **Nginx документация:** https://nginx.org/ru/docs/

---

## Поддержка

**Техподдержка Hostinger:**
- 24/7 чат: в hPanel
- Email: support@hostinger.com
- База знаний: https://support.hostinger.com

**Стоимость Hostinger:**
- **VPS:** от 4.99€/месяц
- **Cloud:** от 9.99€/месяц
- **Business Shared:** от 3.99€/месяц

---

**Удачи с запуском на Hostinger!** 🚀

Если у вас VPS - следуйте Варианту 1 (полная функциональность)
Если Cloud хостинг - используйте Вариант 2
Если обычный хостинг - Вариант 3 (ограниченная функциональность)

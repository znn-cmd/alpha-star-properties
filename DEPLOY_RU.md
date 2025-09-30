# 🚀 Инструкция по Развертыванию на Хостинге

## Вариант 1: Vercel (Рекомендуется) ⭐

**Почему Vercel:**
- ✅ Бесплатный план (достаточно для большинства лендингов)
- ✅ Автоматический SSL сертификат
- ✅ Глобальный CDN
- ✅ Автоматические деплои при изменении кода
- ✅ Идеально работает с Next.js

### Шаг 1: Создать аккаунт на Vercel

1. Перейдите на https://vercel.com
2. Нажмите **Sign Up**
3. Войдите через GitHub (рекомендуется) или email

### Шаг 2: Загрузить код на GitHub

```bash
# В папке проекта выполните:
git add .
git commit -m "Initial commit - Alpha Star Properties"

# Создайте репозиторий на GitHub (https://github.com/new)
# Затем свяжите с локальным репозиторием:
git remote add origin https://github.com/ваш-username/alpha-star-properties.git
git branch -M main
git push -u origin main
```

### Шаг 3: Импортировать проект в Vercel

1. В Vercel нажмите **New Project**
2. Выберите **Import Git Repository**
3. Найдите ваш репозиторий `alpha-star-properties`
4. Нажмите **Import**

### Шаг 4: Настроить Environment Variables

В настройках проекта Vercel добавьте переменные окружения:

**Обязательные:**
```
NEXT_PUBLIC_WHATSAPP_NUMBER = 971501234567
NEXT_PUBLIC_SITE_URL = https://alphastardubai.ae
```

**Для аналитики (опционально):**
```
NEXT_PUBLIC_GA4_ID = G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID = GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID = 123456789
```

**Для CRM (опционально):**
```
HUBSPOT_API_KEY = pat-na1-xxxxx
WEBHOOK_URL = https://your-webhook-url.com/endpoint
```

### Шаг 5: Deploy

1. Нажмите **Deploy**
2. Дождитесь окончания сборки (2-3 минуты)
3. Получите ссылку вида: `https://alpha-star-properties.vercel.app`

### Шаг 6: Подключить свой домен

1. В настройках проекта → **Domains**
2. Добавьте домен: `alphastardubai.ae`
3. Настройте DNS записи у регистратора домена:

```
Type    Name    Value                           TTL
A       @       76.76.21.21                    3600
CNAME   www     cname.vercel-dns.com.          3600
```

4. Дождитесь проверки (до 48 часов, обычно 10-30 минут)
5. SSL сертификат настроится автоматически

### ✅ Готово!

Ваш сайт теперь доступен по адресу `https://alphastardubai.ae`

---

## Вариант 2: Netlify

### Быстрый способ:

1. Зарегистрируйтесь на https://netlify.com
2. Перетащите папку проекта в Netlify Dashboard
3. Или подключите GitHub репозиторий
4. Настройки сборки (автоматически определяются):
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Добавьте переменные окружения в Settings → Environment Variables

---

## Вариант 3: Собственный VPS/VDS

Если у вас есть свой сервер (Ubuntu/Debian):

### 1. Подготовка сервера

```bash
# Подключитесь к серверу по SSH
ssh root@ваш-ip

# Обновите систему
apt update && apt upgrade -y

# Установите Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Установите PM2 (для автозапуска)
npm install -g pm2

# Установите Nginx
apt install -y nginx

# Установите certbot для SSL
apt install -y certbot python3-certbot-nginx
```

### 2. Загрузка проекта на сервер

```bash
# На вашем компьютере:
scp -r C:\Users\zaice\Desktop\dld\alpha root@ваш-ip:/var/www/
```

Или клонируйте с GitHub:
```bash
# На сервере:
cd /var/www
git clone https://github.com/ваш-username/alpha-star-properties.git
cd alpha-star-properties
```

### 3. Настройка проекта

```bash
# Установите зависимости
npm install

# Создайте .env.local с настройками
nano .env.local

# Вставьте:
NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567
NEXT_PUBLIC_SITE_URL=https://alphastardubai.ae
# ... остальные переменные

# Сборка проекта
npm run build
```

### 4. Запуск с PM2

```bash
# Запустите приложение
pm2 start npm --name "alpha-star" -- start

# Автозапуск при перезагрузке
pm2 startup
pm2 save

# Проверка статуса
pm2 status
```

### 5. Настройка Nginx

```bash
# Создайте конфигурацию
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
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Активируйте конфигурацию
ln -s /etc/nginx/sites-available/alphastardubai.ae /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 6. Настройка SSL

```bash
certbot --nginx -d alphastardubai.ae -d www.alphastardubai.ae
```

### ✅ Готово!

Ваш сайт работает на `https://alphastardubai.ae`

---

## Вариант 4: Docker

### Dockerfile (уже создан в проекте)

```bash
# Сборка образа
docker build -t alpha-star-properties .

# Запуск контейнера
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567 \
  -e NEXT_PUBLIC_SITE_URL=https://alphastardubai.ae \
  alpha-star-properties
```

---

## Проверка после деплоя

### Чек-лист:

- [ ] Сайт открывается по основному домену
- [ ] SSL сертификат работает (зеленый замок)
- [ ] Все 3 языка переключаются (EN, AR, RU)
- [ ] Формы отправляются (проверьте в CRM)
- [ ] WhatsApp кнопка открывает чат
- [ ] Аналитика работает (проверьте в GA4 Real-Time)
- [ ] Сайт открывается на мобильных устройствах

### Тестирование

```bash
# Проверка скорости
https://pagespeed.web.dev/
# Введите ваш домен

# Проверка SEO
https://search.google.com/test/mobile-friendly
```

---

## Обновление сайта

### На Vercel:
Просто сделайте `git push` - деплой произойдет автоматически:

```bash
git add .
git commit -m "Обновление контента"
git push origin main
```

### На VPS:
```bash
ssh root@ваш-ip
cd /var/www/alpha-star-properties
git pull
npm install
npm run build
pm2 restart alpha-star
```

---

## Мониторинг

### Vercel Analytics
- Автоматически включен
- Просмотр в Dashboard → Analytics

### Google Analytics
- Real-time отчеты: https://analytics.google.com
- Проверьте события: form_submit, whatsapp_click

### Uptime мониторинг
- UptimeRobot: https://uptimerobot.com (бесплатно)
- Pingdom: https://pingdom.com

---

## Поддержка

**Проблемы с деплоем:**
- Vercel Support: https://vercel.com/support
- Netlify Support: https://www.netlify.com/support

**Документация:**
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs

---

## Цены

### Vercel
- **Hobby (бесплатно):**
  - 100 GB bandwidth
  - Безлимитные деплои
  - SSL включен
  - Достаточно для большинства лендингов

- **Pro ($20/мес):**
  - 1 TB bandwidth
  - Приоритетная поддержка
  - Advanced analytics

### VPS/VDS
- **DigitalOcean:** от $6/мес
- **Hetzner:** от €4/мес
- **Timeweb (RU):** от 200₽/мес

---

**Рекомендация:** Начните с Vercel (бесплатно), если трафик вырастет - переходите на Pro план или VPS.

Удачи с запуском! 🚀

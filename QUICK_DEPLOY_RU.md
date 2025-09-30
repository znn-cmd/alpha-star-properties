# ⚡ Быстрый деплой за 5 минут

## Самый простой способ: Vercel

### 1️⃣ Загрузить на GitHub (разово)

```bash
# Выполните в папке проекта:
git add .
git commit -m "Initial commit"

# Создайте репозиторий на github.com/new
# Затем:
git remote add origin https://github.com/ВАШ_USERNAME/alpha-star-properties.git
git branch -M main
git push -u origin main
```

### 2️⃣ Деплой на Vercel

1. Откройте https://vercel.com/signup
2. Войдите через GitHub
3. Нажмите **New Project**
4. Выберите репозиторий `alpha-star-properties`
5. Нажмите **Deploy**

**Готово!** Через 2-3 минуты получите ссылку вида:
`https://alpha-star-properties.vercel.app`

### 3️⃣ Добавить переменные окружения

В настройках проекта → **Environment Variables**:

```
NEXT_PUBLIC_WHATSAPP_NUMBER = 971501234567
NEXT_PUBLIC_SITE_URL = https://alphastardubai.ae
```

Сохраните и сделайте **Redeploy**.

### 4️⃣ Подключить свой домен

1. Settings → **Domains**
2. Добавьте: `alphastardubai.ae`
3. Настройте DNS у регистратора:

```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

**SSL автоматически!** ✅

---

## Альтернатива: Деплой без GitHub

### Через Vercel CLI:

```bash
# Установите Vercel CLI
npm install -g vercel

# В папке проекта:
vercel login
vercel

# Следуйте инструкциям
```

---

## Обновление сайта

После изменений:

```bash
git add .
git commit -m "Обновление"
git push
```

Vercel автоматически задеплоит изменения! 🚀

---

## Проблемы?

**Ошибка при сборке:**
```bash
# Очистите кэш и пересоберите
vercel --force
```

**Не работают формы:**
- Проверьте переменные окружения в Vercel
- Добавьте `WEBHOOK_URL` и `HUBSPOT_API_KEY`

**Не работает домен:**
- Проверьте DNS записи (до 48 часов)
- Используйте https://dnschecker.org

---

**Всё!** Ваш сайт в продакшене! 🎉

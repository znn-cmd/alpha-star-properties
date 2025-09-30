# ⚠️ ВАЖНО: Оптимизация видео

## Текущая проблема

Видео `13606726_3840_2160_30fps.mp4` имеет размер **35 МБ** - это слишком большой размер для веб-сайта!

### Почему это проблема:

- 🐌 Медленная загрузка страницы (особенно на мобильных)
- 📉 Плохой Lighthouse score
- 💸 Большой расход трафика для пользователей
- ❌ Vercel может отклонить деплой (лимит 100 МБ на проект)

## ✅ Решение: Сжать видео

### Рекомендуемые параметры:

- **Разрешение:** 1920x1080 (или 1280x720 для мобильных)
- **Битрейт:** 2-3 Mbps
- **Формат:** MP4 (H.264 codec)
- **Аудио:** Удалить (не нужно для фонового видео)
- **Целевой размер:** < 5 МБ

### Способ 1: Онлайн сервисы (проще всего)

**CloudConvert** (рекомендуется):
1. https://cloudconvert.com/mp4-compress
2. Загрузите видео
3. Выберите "Custom settings":
   - Width: 1920
   - Video Codec: H.264
   - Video Bitrate: 2000k
   - Audio: Remove
4. Конвертируйте и скачайте

**Другие сервисы:**
- https://www.freeconvert.com/video-compressor
- https://www.online-convert.com/
- https://www.videosmaller.com/

### Способ 2: FFmpeg (для профессионалов)

```bash
# Установите FFmpeg: https://ffmpeg.org/download.html

# Перейдите в папку с видео
cd C:\Users\zaice\Desktop\dld\alpha\public\assets

# Вариант 1: Хорошее качество, ~3-5 МБ
ffmpeg -i 13606726_3840_2160_30fps.mp4 ^
  -vcodec libx264 ^
  -crf 28 ^
  -preset medium ^
  -vf "scale=1920:-2" ^
  -an ^
  hero-video.mp4

# Вариант 2: Среднее качество, ~2-3 МБ
ffmpeg -i 13606726_3840_2160_30fps.mp4 ^
  -vcodec libx264 ^
  -crf 32 ^
  -preset fast ^
  -vf "scale=1280:-2" ^
  -an ^
  hero-video-mobile.mp4
```

### Способ 3: HandBrake (UI приложение)

1. Скачайте HandBrake: https://handbrake.fr/
2. Откройте видео
3. Настройки:
   - **Preset:** "Web" → "Gmail Small 3 Minutes 720p30"
   - **Dimensions:** Width: 1920, Height: 1080
   - **Video:** H.264, Constant Quality: 28
   - **Audio:** Remove all audio tracks
4. Start Encode
5. Сохраните как `hero-video.mp4`

## 📝 После оптимизации:

1. Замените файл в `public/assets/hero-video.mp4`
2. Удалите оригинал `13606726_3840_2160_30fps.mp4`
3. Закоммитьте:

```bash
git add public/assets/
git commit -m "Add optimized hero video"
git push origin main
```

## 🎯 Проверка результата:

После оптимизации проверьте:
- Размер файла: `< 5 МБ` ✅
- Разрешение: `1920x1080` или `1280x720` ✅
- Формат: `MP4 (H.264)` ✅
- Нет аудио ✅

---

**Нужна помощь?** Напишите мне после оптимизации!

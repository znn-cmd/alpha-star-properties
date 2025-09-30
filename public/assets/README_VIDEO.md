# Video Assets

## Hero Background Video

Place your video file here:
- **File name:** `hero-video.mp4` or `13606726_3840_2160_30fps.mp4`
- **Recommended size:** 1920x1080 or 3840x2160
- **Format:** MP4 (H.264 codec)
- **Max file size:** < 5 MB (compress if needed)

### How to optimize video for web:

Using FFmpeg:
```bash
# Compress and optimize for web
ffmpeg -i 13606726_3840_2160_30fps.mp4 -vcodec libx264 -crf 28 -preset fast -vf scale=1920:-2 -an hero-video.mp4
```

This will:
- Scale to 1920px width
- Remove audio
- Compress for web
- Reduce file size significantly

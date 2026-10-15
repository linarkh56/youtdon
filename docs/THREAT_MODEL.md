# Модель угроз

Повторная доставка блокируется уникальностью SQLite; URL ограничен HTTPS и точным allowlist hostname; renderer sandboxed с `contextIsolation` и `nodeIntegration:false`; сервер слушает только `127.0.0.1`; окна Electron принимают навигацию только к exact origin этого loopback-сервера; внешние credentials не принимаются renderer.

Управляющий токен генерируется main и передаётся только через минимальный preload IPC API; URL и логи его не содержат. Видео показывается в отдельном sandboxed окне Electron с точным loopback-origin; OBS получает изображение через обычный захват окна и не получает управляющий токен.

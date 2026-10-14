# Модель угроз

Повторная доставка блокируется уникальностью SQLite; URL ограничен HTTPS и точным allowlist hostname; renderer sandboxed с `contextIsolation` и `nodeIntegration:false`; сервер слушает только `127.0.0.1`; внешние credentials не принимаются renderer.

Управляющий токен генерируется main и передаётся только через минимальный preload IPC API; URL и логи его не содержат. Overlay остаётся read-only и loopback-only: запрос `/overlay.html` выдаёт HttpOnly SameSite cookie с ограниченным сроком, а WebSocket принимает соединения только с этой сессией. Cookie не находится в URL и не даёт доступа к управляющим API.

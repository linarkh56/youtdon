# Модель угроз

Повторная доставка блокируется уникальностью SQLite; URL ограничен HTTPS и точным allowlist hostname; renderer sandboxed с `contextIsolation` и `nodeIntegration:false`; сервер слушает только `127.0.0.1`; внешние credentials не принимаются renderer.

Ограничение: токен управления сейчас генерируется main, но не передаётся renderer, поэтому UI демонстрирует только каркас. До выпуска нужен отдельный защищённый IPC и минимальный токен overlay.

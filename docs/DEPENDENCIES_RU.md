# Внешние зависимости

- `electron` — desktop runtime.
- `express` — локальный HTTP API.
- `ws` — оставшаяся локальная транспортная зависимость; основной способ вывода видео для OBS — захват отдельного окна приложения.
- `sql.js` — SQLite-compatible WASM persistence без native toolchain.
- `vitest` — unit и integration tests.
- `electron-builder` — Windows unpacked и NSIS packaging.
- YouTube IFrame Player API — внешний официальный playback API.

Перед публикацией проверяйте лицензии актуальных версий через lock-файл и package metadata. Реальные платёжные SDK не включены.

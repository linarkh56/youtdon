# Отчёт фактических проверок

Последний проверенный commit: `65a711a`. Installer собран из production-кода `4b04ce0`; SHA-256 `3F8AE82525696586B9147010720C914C3FC5E1357A59BC58F9DB0E37821ABF98`.

Пройдено:

- `npm ci`
- `npm run typecheck`
- `npm test`: 26 тестов в 8 файлах
- `npm run build`
- `npm audit --omit=dev --audit-level=high`: 0 high/critical vulnerabilities
- syntax-check `src/renderer/renderer.js` и inline script `src/renderer/player.html`
- `npm run dist:installer` на Windows
- smoke-запуск `release/win-unpacked/YouTube Donation Player.exe` без Node/npm: процесс жил 6 секунд
- silent install NSIS в изолированный `%TEMP%` каталог: exit code 0; установленный exe жил 6 секунд; silent uninstall exit code 0 и удалил exe

Автоматически проверены parser, pricing, queue transitions, queue clear с сохранением истории, refund transition, playback timer, retry после ошибки видео, SQLite migration v1/v2, транзакции, уникальность платежа, backup/restore, auth, DTO validation, malformed restore payload, history, authenticated version metadata, safe error journal, playback control и реальный WebSocket overlay broadcast.

Не выполнено в этой среде:

- установка, повторный запуск и удаление installer на чистой Windows 10/11 (isolated Temp smoke пройден, чистая машина ещё не проверена);
- полный реальный YouTube IFrame lifecycle, OBS Browser Source и ручное переподключение OBS;
- реальные DonationAlerts/DonatePay события, потому что credentials отсутствуют;
- подпись installer сертификатом.

Полный `npm audit` содержит 8 moderate dev-toolchain findings через electron-builder; production-зависимости проходят high-level audit.

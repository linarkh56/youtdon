# Отчёт фактических проверок

Последний проверенный commit: `c425e05` (после него изменён только `PROJECT_STATUS.md`).

Пройдено:

- `npm ci`
- `npm run typecheck`
- `npm test`: 21 тест в 8 файлах
- `npm run build`
- `npm audit --omit=dev --audit-level=high`: 0 high/critical vulnerabilities
- syntax-check `src/renderer/renderer.js` и inline script `src/renderer/player.html`
- `npm run dist:installer` на Windows
- smoke-запуск `release/win-unpacked/YouTube Donation Player.exe` без Node/npm: процесс жил 6 секунд

Автоматически проверены parser, pricing, queue transitions, playback timer, retry после ошибки видео, SQLite migration v1/v2, транзакции, уникальность платежа, backup/restore, auth, DTO validation, malformed restore payload и history.

Не выполнено в этой среде:

- установка, повторный запуск и удаление installer на чистой Windows 10/11;
- полный реальный YouTube IFrame lifecycle, OBS Browser Source и ручное переподключение OBS;
- реальные DonationAlerts/DonatePay события, потому что credentials отсутствуют;
- подпись installer сертификатом.

Полный `npm audit` содержит 8 moderate dev-toolchain findings через electron-builder; production-зависимости проходят high-level audit.

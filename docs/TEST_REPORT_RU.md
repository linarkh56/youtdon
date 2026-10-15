# Отчёт фактических проверок

Последний проверенный commit: `893f3a6`. Installer собран из этого production-кода; SHA-256 `0B65666EAE1E0C01E2F7CBCA4F53BF6F088ADBCBF242084F96750495E66E1531`.

Пройдено:

- `npm ci`
- `npm run typecheck`
- `npm test`: 38 тестов в 12 файлах
- `npm run build`
- `npm audit --omit=dev --audit-level=high`: 0 high/critical vulnerabilities
- syntax-check `src/renderer/renderer.js` и inline script `src/renderer/player.html`
- `npm run dist:installer` на Windows
- smoke-запуск `release/win-unpacked/YouTube Donation Player.exe` без Node/npm: процесс жил 6 секунд
- silent install NSIS в изолированный `%TEMP%` каталог: exit code 0; установленный exe жил 6 секунд; silent uninstall exit code 0 и удалил exe
- после установленного запуска созданы `%APPDATA%\\youtdon\\youtdon.sqlite` (24 KB) и `%APPDATA%\\youtdon\\youtdon.log` (177 B)

Автоматически проверены parser с отклонением playlist/timing параметров, pricing, queue transitions, queue clear с сохранением истории, refund transition, playback timer, retry после ошибки видео, SQLite migration v1/v2, транзакции, уникальность платежа, конкурентная дедупликация provider event, backup/restore, restart recovery playing-заказа, auth, DTO validation, malformed restore payload, diagnostics export без secrets, history, authenticated version metadata, safe error journal без secrets, playback control и exact navigation origin policy.

Не выполнено в этой среде:

- установка, повторный запуск и удаление installer на чистой Windows 10/11 (isolated Temp smoke пройден, чистая машина ещё не проверена);
- полный реальный YouTube IFrame lifecycle и ручной захват окна в OBS;
- реальные DonationAlerts/DonatePay события, потому что credentials отсутствуют;
- полноценный renderer XSS browser E2E: в этой среде он не автоматизирован; escaping проверяется кодом renderer и ручная проверка остаётся в acceptance checklist.
- сетевой disconnect/reconnect: в этой среде он не автоматизирован; mock-поток и восстановление состояния проверяются unit/integration сценариями, ручная проверка включена в acceptance checklist.
- повторный isolated install smoke именно для installer hash `79DD2B44E8514879F2E6E201A5CBCA153E6DCA6B7F483DA9AA1F886F57F49AFD`: запуск процесса в этой среде заблокирован локальной политикой; предыдущий smoke для того же packaging pipeline зафиксирован выше.

Полный `npm audit` содержит 8 moderate dev-toolchain findings через electron-builder; production-зависимости проходят high-level audit. Installer намеренно не подписан сертификатом для локального тестирования.

Ограничение persistence: используется `sql.js` WASM с атомарными транзакциями и экспортом файла; SQLite WAL и многопроцессная запись не заявляются.

# Release checklist

- [ ] `npm ci` из lock-файла.
- [ ] `npm run typecheck`.
- [ ] `npm test`.
- [ ] `npm audit --omit=dev --audit-level=high`.
- [ ] `npm run dist:installer` на `windows-latest`.
- [ ] Установка и удаление на чистой Windows 10/11.
- [ ] Подписать бинарники сертификатом выпуска или явно выпустить неподписанную тестовую сборку.
- [ ] Проверить backup/restore и диагностический экспорт.
- [ ] Проверить mock-донат, очередь, playback и OBS overlay.
- [ ] Не включать credentials в installer, репозиторий или логи.
- [ ] Перед публикацией отдельно проверить DonationAlerts/DonatePay на реальных аккаунтах.

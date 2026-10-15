# Release checklist

- [ ] `npm ci` из lock-файла.
- [ ] `npm run typecheck`.
- [ ] `npm test`.
- [ ] `npm audit --omit=dev --audit-level=high`.
- [ ] Убедиться, что Windows CI выполняет typecheck, lint, test, production audit и сохраняет installer artifact.
- [ ] `npm run dist:installer` на `windows-latest`.
- [ ] Установка и удаление на чистой Windows 10/11.
- [ ] Для локального тестирования использовать неподписанную сборку; сертификат подписи не является обязательным.
- [ ] Проверить backup/restore и диагностический экспорт.
- [ ] Проверить mock-донат, очередь, playback и захват окна YouTube Donation Player в OBS.
- [ ] Не включать credentials в installer, репозиторий или логи.
- [ ] Перед публикацией отдельно проверить DonationAlerts/DonatePay на реальных аккаунтах.

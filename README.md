# YouTube Donation Player

Локальное Windows-приложение для очереди YouTube-видео, оплаченных донатами. Версия `0.1.0` предназначена для интеграционного тестирования.

Запуск: `npm ci`, затем `npm start`. Тесты: `npm test`; типы: `npm run typecheck`; Windows build: `npm run dist`.

## Установка Windows

Для тестовой передачи используйте `release/YouTube Donation Player Setup 0.1.0.exe`. Installer неподписан сертификатом: Windows SmartScreen может показать предупреждение, поэтому проверяйте SHA-256 из `docs/TEST_REPORT_RU.md` перед запуском. Установка не требует Node.js или npm. После запуска база и журнал создаются в `%APPDATA%\youtdon`; удаление выполняется через стандартный uninstaller в каталоге установки.

Текущая сборка работает только в mock-режиме. DonationAlerts и DonatePay не подключены, credentials отсутствуют, реальные платежи не принимаются.

Приложение использует loopback API и не даёт renderer доступ к Node.js. DonationAlerts и DonatePay пока имеют безопасные unconfigured adapters: реальные OAuth/API credentials и внешние аккаунты в этой среде не проверялись.

Поддерживаются только `youtube.com/watch?v=...`, `youtube.com/shorts/...` и `youtu.be/...`. Прямые эфиры, плейлисты, произвольные хосты и скачивание видео не поддерживаются.

Документы: [FAQ](docs/FAQ_RU.md), [устранение неполадок](docs/TROUBLESHOOTING_RU.md), [release checklist](docs/RELEASE_CHECKLIST_RU.md), [политика обработки данных](docs/DATA_POLICY_RU.md), [зависимости](docs/DEPENDENCIES_RU.md), [DonationAlerts](docs/INTEGRATION_DONATIONALERTS_RU.md), [DonatePay](docs/INTEGRATION_DONATEPAY_RU.md), [отчёт тестов](docs/TEST_REPORT_RU.md), [changelog](CHANGELOG.md).

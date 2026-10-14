# Статус проекта

Готово: TypeScript/Electron scaffold, строгий YouTube URL parser, целочисленный тариф, переносимое SQLite WASM-хранилище с уникальностью платежа, восстановление очереди, FIFO queue и проверяемые переходы статусов, mock-провайдер, loopback API с preload IPC-токеном, русскоязычный тестовый renderer, unit-тесты и Windows CI-конфигурация.

Не проверено: реальные DonationAlerts OAuth/Centrifugo и DonatePay API, полноценный YouTube IFrame lifecycle, OBS WebSocket overlay, Windows Credential Manager, installer на целевой Windows. Локальный electron-builder unpacked build заблокирован отсутствием права создавать symbolic links при распаковке winCodeSign; CI на windows-latest должен выполнить сборку.

Следующий этап: player controller, WebSocket overlay, защищённое хранилище credentials, миграции, интеграционные тесты и ручной acceptance checklist.

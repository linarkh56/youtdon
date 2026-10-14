# Статус проекта

Готово: TypeScript/Electron scaffold, строгий YouTube URL parser, целочисленный тариф, переносимое SQLite WASM-хранилище с уникальностью платежа и сохранением настроек, восстановление очереди, FIFO queue с автоматическим продвижением, backend playback timer с pause/resume, отдельное окно YouTube IFrame Player API, read-only loopback overlay с WebSocket и reconnect, mock-провайдер, loopback API с preload IPC-токеном, DTO-проверками, moderation transitions, изменяемой конфигурацией тарифа, diagnostics endpoint и backup endpoint, панель очереди/модерации с escaping, русскоязычный renderer, unit/integration-тесты и Windows CI-конфигурация.

Не проверено: реальные DonationAlerts OAuth/Centrifugo и DonatePay API, полноценный YouTube IFrame lifecycle, Windows Credential Manager, installer на целевой Windows. Локальный electron-builder unpacked build заблокирован отсутствием права создавать symbolic links при распаковке winCodeSign; CI на windows-latest должен выполнить сборку. `npm audit --omit=dev --audit-level=high` проходит без production vulnerabilities; dev dependency audit требует отдельного обновления.

Следующий этап: player controller, WebSocket overlay, защищённое хранилище credentials, миграции, интеграционные тесты и ручной acceptance checklist.

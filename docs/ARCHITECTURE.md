# Архитектура

Electron main запускает окно и loopback HTTP API. `domain` содержит чистые правила URL, денег и очереди. `persistence` использует версионированные SQLite migrations, транзакции и уникальность `(provider, providerDonationId)`. `integrations` изолирует провайдеры через `PaymentAdapter`. Renderer не принимает финансовых решений; управляющий token доступен только через минимальный preload IPC. Overlay получает HttpOnly loopback-сессию при открытии страницы и подключается к read-only WebSocket без секретов в URL.

# Архитектура

Electron main запускает окно и loopback HTTP API. `domain` содержит чистые правила URL, денег и очереди. `persistence` использует SQLite WAL и уникальность `(provider, providerDonationId)`. `integrations` изолирует провайдеры через `PaymentAdapter`. Renderer не принимает финансовых решений и не получает секреты.

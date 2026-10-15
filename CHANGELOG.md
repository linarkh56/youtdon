# Changelog

## 0.1.0 - 2026-10-14

- Добавлен Electron Windows application scaffold.
- Добавлены mock-донаты, FIFO-очередь, тарифы в копейках и backend timer.
- Добавлены SQLite WASM persistence, восстановление и backup.
- Добавлены YouTube URL validation и отдельное окно IFrame-плеера для захвата в OBS.
- Добавлены moderation API, diagnostics export и русскоязычная панель.
- Добавлены pause/resume/skip/stop, refund, retry после ошибки видео, очистка очереди с сохранением истории и журнал ошибок без secrets.
- Добавлены строгие DTO, запрет внешней навигации Electron и authenticated version metadata.
- Добавлены SQLite migrations v1/v2, restart recovery-тесты, конкурентная дедупликация событий и расширенный Windows install smoke.
- Playlist URL и лишние YouTube timing/query параметры отклоняются.
- Добавлены unit/integration tests и NSIS installer build.
- DonationAlerts и DonatePay остаются неподключёнными до получения credentials.
- Installer выпускается без сертификата Windows для локального тестирования.
- Настраиваемое отдельное окно YouTube-плеера: размер, режим «поверх других окон» и сохранение параметров для захвата окна в OBS.

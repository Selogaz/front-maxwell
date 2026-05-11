/**
 * Делает `fn()` до 3 попыток. Между попытками — экспоненциальная пауза.
 * Ретрай идёт только на сетевые ошибки и 5xx-ответы (которые фронт
 * не может починить). 4xx — не ретраим, это валидная ошибка приложения.
 *
 * Используем для справочных GET-запросов на `/api/character-builder/*`,
 * чтобы редкие 502/503 от бэка не превращались в полный обрыв UI.
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  attempts = 3,
  baseDelayMs = 400
): Promise<T> => {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      // Не ретраим 4xx (Forbidden, NotFound и пр.) — это не починится повтором.
      const message = e instanceof Error ? e.message : String(e);
      const status4xx = /\b4\d{2}\b/.test(message);
      if (status4xx) throw e;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, baseDelayMs * 2 ** i));
      }
    }
  }
  throw lastError;
};

import { vi, beforeAll, afterAll } from 'vitest';

export const mockConsole = () => {
  const fnLog = vi.spyOn(console, 'log');
  const fnError = vi.spyOn(console, 'error');

  beforeAll(() => {
    const fn = () => void 0;
    fnLog.mockImplementation(fn);
    fnError.mockImplementation(fn);
  });

  afterAll(() => {
    fnLog.mockRestore();
    fnError.mockRestore();
  });
};

mockConsole();

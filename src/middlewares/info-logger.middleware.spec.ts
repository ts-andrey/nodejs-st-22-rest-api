import { InfoLoggerMiddleware } from './info-logger.middleware';

describe('InfoLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new InfoLoggerMiddleware()).toBeDefined();
  });
});

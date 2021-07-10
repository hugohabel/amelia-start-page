// Internal Dependencies
import { getDiffUntilDate, formatTimeDiff } from '../timeCalculations';

describe('Utils - Time Calculations', () => {

  // Setup and Teardown

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 5, 13));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('gets time difference until target date', async () => {
    const timeDiff = getDiffUntilDate('2021-12-25T05:00:00.000Z');

    expect(timeDiff).toEqual({
      days: "195",
      hours: "0",
      minutes: "0"
    });
  });

  it('gets time difference until target date when an empty string is passed as parameter', async () => {
    const timeDiff = getDiffUntilDate('');

    expect(timeDiff).toEqual({
      days: "0",
      hours: "0",
      minutes: "0"
    });
  });

  it('gets template with parsed values - days', async () => {
    // Mocked values
    const timeDiff = {
      days: "195",
      hours: "18",
      minutes: "34"
    };

    const result = formatTimeDiff(timeDiff, 'days');

    expect(result).toEqual('195 days');
  });

  it('gets template with parsed values - days + hours', async () => {
    // Mocked values
    const timeDiff = {
      days: "195",
      hours: "18",
      minutes: "34"
    };

    const result = formatTimeDiff(timeDiff, 'days+hours');

    expect(result).toEqual('195 days 18 hours');
  });
});
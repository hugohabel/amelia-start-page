/* eslint-disable no-console */
// Interfaces
interface ILogParams {
  data?: string;
  file: string;
  level: 'warn' | 'error' | 'info';
  location: string;
  message: string;
}

/**
 * Simple and small log utility function. It will be replaced with a more
 * robust implementation in the future. The goal is to integrate with Splunk
 * or some other tool like it.
 */
function log({ level, message, data, file, location }: ILogParams): void {
  switch (level) {
    case 'warn':
      console.warn(`Msg: ${message} at ${file} in ${location} - Data ${data}`);
      break;
    case 'info':
      console.info(`Msg: ${message} at ${file} in ${location} - Data ${data}`);
      break;
    default:
      console.error(`Msg: ${message} at ${file} in ${location} - Data ${data}`);
      break;
  }
}

export { log };

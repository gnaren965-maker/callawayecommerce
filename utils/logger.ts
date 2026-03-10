/**
 * Logger utility for structured logging across tests
 */

interface LogContext {
  testName?: string;
  timestamp?: string;
}

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel = LOG_LEVELS[(LOG_LEVEL as keyof typeof LOG_LEVELS) || 'info'];

/**
 * Format log message with timestamp
 */
function formatLogMessage(level: LogLevel, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
}

/**
 * Log a debug message
 */
export function logDebug(message: string, context?: LogContext): void {
  if (currentLevel <= LOG_LEVELS.debug) {
    console.debug(formatLogMessage(LogLevel.DEBUG, message, context));
  }
}

/**
 * Log an info message
 */
export function logInfo(message: string, context?: LogContext): void {
  if (currentLevel <= LOG_LEVELS.info) {
    console.log(formatLogMessage(LogLevel.INFO, message, context));
  }
}

/**
 * Log a warning message
 */
export function logWarn(message: string, context?: LogContext): void {
  if (currentLevel <= LOG_LEVELS.warn) {
    console.warn(formatLogMessage(LogLevel.WARN, message, context));
  }
}

/**
 * Log an error message
 */
export function logError(message: string, error?: Error | string, context?: LogContext): void {
  if (currentLevel <= LOG_LEVELS.error) {
    const errorMessage = error instanceof Error ? error.message : error;
    console.error(formatLogMessage(LogLevel.ERROR, message, context), errorMessage);
  }
}

/**
 * Log a test step - used to track test execution flow
 */
export function logStep(stepDescription: string): void {
  const message = `➤ ${stepDescription}`;
  console.log(`\n${formatLogMessage(LogLevel.INFO, message)}`);
}

/**
 * Log the start of a test
 */
export function logTestStart(testName: string): void {
  const message = `🧪 Test Started: ${testName}`;
  console.log(`\n${formatLogMessage(LogLevel.INFO, message)}`);
}

/**
 * Log the end of a test
 */
export function logTestEnd(testName: string, passed: boolean): void {
  const icon = passed ? '✅' : '❌';
  const message = `${icon} Test Completed: ${testName}`;
  console.log(`\n${formatLogMessage(LogLevel.INFO, message)}\n`);
}

/**
 * Log element interaction
 */
export function logElementInteraction(action: string, selector: string): void {
  const message = `[Element] ${action}: ${selector}`;
  logDebug(message);
}

/**
 * Log API interaction
 */
export function logAPICall(method: string, url: string, status?: number): void {
  const message = `[API] ${method} ${url} ${status ? `- Status: ${status}` : ''}`;
  logDebug(message);
}

/**
 * Log data
 */
export function logData(dataName: string, data: any): void {
  const message = `[Data] ${dataName}: ${JSON.stringify(data)}`;
  logDebug(message);
}

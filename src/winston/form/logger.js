const winston = require("winston");
import { transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import moment from "moment-timezone";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const FOLDER_PATH = path.join(process.cwd(), "./src/logs/form");

class DailyRotateFileLosAngeles extends DailyRotateFile {
  constructor(opts) {
    super({
      filename: `${FOLDER_PATH}/%DATE%.txt`,
      datePattern: "YYYY-MM-DD",
      ...opts,
    });
  }
  log(info, callback) {
    setImmediate(() => {
      super.log(info, callback);
    });
  }
}

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [new transports.Console(), new DailyRotateFileLosAngeles()],
});

export function form_write_logs({
  message = null,
  IND_current_time = moment()
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss A"),
  log_type = "debug",
} = {}) {
  let log_data_list = [];
  log_data_list.push(`IND_current_time: ${IND_current_time}`);

  if (message !== null) {
    log_data_list.push(`message: ${message}`);
  }
  const logs = log_data_list.join(", ");
  switch (log_type) {
    case "debug":
      logger.debug(logs);
      break;
    case "info":
      logger.info(logs);
      break;
    case "warning":
      logger.warn(logs);
      break;
    case "error":
      logger.error(logs);
      break;
    case "critical":
      logger.error(logs);
      break;
    default:
      logger.debug(logs);
      break;
  }
}

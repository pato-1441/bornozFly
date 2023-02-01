import logger from "../helpers/logger.js";

const getInfo = (req, res) => {
  const { url, method } = req;
  logger.info(`Ruta: "${url}", metodo: "${method}"`);
  res.json({
    argv: process.argv.slice(2),
    platform: process.platform,
    version: process.version,
    rss: process.memoryUsage(),
    cwd: process.cwd(),
    pe: process.execPath,
    pid: process.pid,
  });
};

const getInfoWithClg = (req, res) => {
  const { url, method } = req;
  logger.info(`Ruta: "${url}", metodo: "${method}"`);
  console.log({
    argv: process.argv.slice(2),
    platform: process.platform,
    version: process.version,
    rss: process.memoryUsage(),
    cwd: process.cwd(),
    pe: process.execPath,
    pid: process.pid,
  });
  res.json({
    argv: process.argv.slice(2),
    platform: process.platform,
    version: process.version,
    rss: process.memoryUsage(),
    cwd: process.cwd(),
    pe: process.execPath,
    pid: process.pid,
  });
};

const getInfoZip = (req, res) => {
  res.json({
    argv: process.argv.slice(2),
    platform: process.platform,
    version: process.version,
    rss: process.memoryUsage(),
    cwd: process.cwd(),
    pe: process.execPath,
    pid: process.pid,
  });
};

export default { getInfo, getInfoWithClg, getInfoZip };

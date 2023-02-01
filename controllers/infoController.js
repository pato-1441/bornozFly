import logger from "../helpers/logger";

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

export default { getInfo };

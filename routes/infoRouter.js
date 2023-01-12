import { Router } from "express";
import compression from "compression";
import logger from "../logger.js";

const infoRouter = Router();

infoRouter.get("/", (req, res) => {
  const { url, method } = req;
  logger.info(`Ruta: "${url}", metodo: "${method}"`);
  /* console.log({
    argv: process.argv.slice(2),
    platform: process.platform,
    version: process.version,
    rss: process.memoryUsage(),
    cwd: process.cwd(),
    pe: process.execPath,
    pid: process.pid,
  }); */
  res.json({
    argv: process.argv.slice(2),
    platform: process.platform,
    version: process.version,
    rss: process.memoryUsage(),
    cwd: process.cwd(),
    pe: process.execPath,
    pid: process.pid,
  });
});

infoRouter.get("/clg", (req, res) => {
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
});

infoRouter.get("/zip", compression(), (req, res) => {
  res.json({
    argv: process.argv.slice(2),
    platform: process.platform,
    version: process.version,
    rss: process.memoryUsage(),
    cwd: process.cwd(),
    pe: process.execPath,
    pid: process.pid,
  });
});

export default infoRouter;

module.exports = function (req, res, next) {
  const host = req.headers.host;
  const url = req.url;
  const env = process.env.NODE_ENV;
  const canonicalDomain = process.env.CANONICAL_DOMAIN; // e.g. www.destination_domain.com

  if (env === 'production' && host !== canonicalDomain) {
    res.writeHead(301, { Location: 'https://' + canonicalDomain + url });
    return res.end();
  }

  return next();
};

// certwatch-js: SSL/TLS Certificate Expiry & Rotation Monitor

const tls = require('tls');
const https = require('https');

/**
 * Fetch SSL/TLS certificate information for a given hostname.
 * @param {string} hostname - The domain or IP to check.
 * @param {number} port - The port to use (default: 443).
 * @returns {Promise<object>} - Certificate metadata.
 */
function getCertificateInfo(hostname, port = 443) {
  return new Promise((resolve, reject) => {
    const options = {
      host: hostname,
      port: port,
      servername: hostname,
      rejectUnauthorized: false,
    };

    const socket = tls.connect(options, () => {
      const cert = socket.getPeerCertificate();
      socket.end();

      if (!cert || Object.keys(cert).length === 0) {
        return reject(new Error(`No certificate found for ${hostname}`));
      }

      resolve({
        subject: cert.subject,
        issuer: cert.issuer,
        valid_from: cert.valid_from,
        valid_to: cert.valid_to,
        valid_from_ts: new Date(cert.valid_from),
        valid_to_ts: new Date(cert.valid_to),
        days_remaining: Math.floor((new Date(cert.valid_to) - new Date()) / (1000 * 60 * 60 * 24))
      });
    });

    socket.on('error', reject);
  });
}

/**
 * Check and alert if certificate is expiring soon.
 * @param {string} hostname
 * @param {number} daysThreshold
 */
async function checkCertExpiry(hostname, daysThreshold = 30) {
  try {
    const cert = await getCertificateInfo(hostname);
    if (cert.days_remaining <= daysThreshold) {
      console.warn(` [${hostname}] Certificate expiring in ${cert.days_remaining} days (expires on ${cert.valid_to})`);
    } else {
      console.log(` [${hostname}] Certificate is valid. Expires in ${cert.days_remaining} days (on ${cert.valid_to})`);
    }
  } catch (error) {
    console.error(`[${hostname}] Failed to retrieve certificate: ${error.message}`);
  }
}

module.exports = {
  getCertificateInfo,
  checkCertExpiry
};


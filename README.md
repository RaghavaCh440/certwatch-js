# certwatch-js

**SSL/TLS Certificate Expiry & Rotation Monitor**

![npm](https://img.shields.io/npm/v/certwatch-js)  
![license](https://img.shields.io/npm/l/certwatch-js)  
![downloads](https://img.shields.io/npm/dw/certwatch-js)

##  Overview

`certwatch-js` is a lightweight Node.js library designed to monitor the validity and configuration of SSL/TLS certificates used by web services, APIs, and infrastructure endpoints. It programmatically retrieves certificate metadata such as issuer, subject, validity period, and expiration date by establishing a secure connection to the target host. This information is then evaluated to determine whether the certificate is close to expiration or misconfigured.

By integrating certwatch-js into DevOps pipelines, you can proactively detect issues like upcoming certificate expiry, self-signed or untrusted certs, and misaligned subject details. This helps prevent production outages, security incidents, or compliance violations due to overlooked certificate renewals. The tool is ideal for security teams, cloud engineers, and platform reliability groups who want a programmatic safeguard against certificate-related risks.

It can be run as a simple CLI check, scheduled cron job, or embedded into CI/CD workflows using tools like Jenkins, GitHub Actions, or GitLab CI. With minimal setup and no third-party dependencies, certwatch-js offers an efficient and portable way to enforce SSL hygiene across distributed systems.


## Installation

```bash
npm install certwatch-js
```

## Usage
```
const { getCertificateInfo, checkCertExpiry } = require('certwatch-js');

// Get certificate metadata
getCertificateInfo("example.com").then(console.log);

// Alert if expiring within 15 days
checkCertExpiry("example.com", 15);
```

## Output Example
-  [example.com] Certificate is valid. Expires in 75 days (on 2025-08-23)

## API

getCertificateInfo(hostname, port = 443)
Returns a Promise with:

- subject, issuer

- valid_from, valid_to

- days_remaining

checkCertExpiry(hostname, daysThreshold = 30)
Logs a warning if the cert expires within daysThreshold.

## Use Cases

- Monitor SSL expiry in CI/CD workflows

- Trigger alerts for public-facing certs nearing expiration

- Audit security posture of DevOps infrastructure

- Integrate into logging/observability systems

## Security & Compliance

This library can help enforce certificate hygiene policies, reduce SSL-related outages, and support compliance goals such as PCI-DSS or SOC 2, where proactive certificate management is essential.

##  `LICENSE` (MIT)

```
MIT License

Copyright (c) 2025 Raghava Chellu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


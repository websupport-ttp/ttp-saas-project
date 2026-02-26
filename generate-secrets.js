// Generate secure secrets for JWT and other environment variables
const crypto = require('crypto');

console.log('\n=== Secure Secret Generator ===\n');

// Generate JWT Access Secret (64 bytes = 128 hex characters)
const jwtAccessSecret = crypto.randomBytes(64).toString('hex');
console.log('JWT_ACCESS_SECRET:');
console.log(jwtAccessSecret);
console.log('');

// Generate JWT Refresh Secret (64 bytes = 128 hex characters)
const jwtRefreshSecret = crypto.randomBytes(64).toString('hex');
console.log('JWT_REFRESH_SECRET:');
console.log(jwtRefreshSecret);
console.log('');

// Generate JWT Secret (for backward compatibility)
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('JWT_SECRET:');
console.log(jwtSecret);
console.log('');

// Generate Cookie Secret (32 bytes = 64 hex characters)
const cookieSecret = crypto.randomBytes(32).toString('hex');
console.log('COOKIE_SECRET:');
console.log(cookieSecret);
console.log('');

// Generate Session Secret (32 bytes = 64 hex characters)
const sessionSecret = crypto.randomBytes(32).toString('hex');
console.log('SESSION_SECRET:');
console.log(sessionSecret);
console.log('');

// Generate Encryption Key (32 bytes for AES-256)
const encryptionKey = crypto.randomBytes(32).toString('hex');
console.log('ENCRYPTION_KEY:');
console.log(encryptionKey);
console.log('');

console.log('=== Copy these to your .env file ===\n');
console.log(`JWT_ACCESS_SECRET=${jwtAccessSecret}`);
console.log(`JWT_REFRESH_SECRET=${jwtRefreshSecret}`);
console.log(`JWT_SECRET=${jwtSecret}`);
console.log(`COOKIE_SECRET=${cookieSecret}`);
console.log(`SESSION_SECRET=${sessionSecret}`);
console.log(`ENCRYPTION_KEY=${encryptionKey}`);
console.log('');

console.log('✓ All secrets generated successfully!');
console.log('⚠️  Keep these secrets secure and never commit them to git!\n');

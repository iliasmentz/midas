import {EncryptionTransformer} from 'typeorm-encrypted';

const ENCRYPTION_ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY =
  process.env.DB_ENCRYPTION_KEY ||
  'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61';

/**
 * This should be used to encrypt/decrypt specific columns
 * from/to the database in order to be safe in case someone
 * maliciously gets access to our database.
 */
export default new EncryptionTransformer({
  key: ENCRYPTION_KEY,
  algorithm: ENCRYPTION_ALGORITHM,
  ivLength: 16,
});

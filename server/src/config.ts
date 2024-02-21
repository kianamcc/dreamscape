import uuid4 from "uuid4";
import sha256 from "crypto-js/sha256";
import dotenv from "dotenv";

dotenv.config();

const generateSecretKey = () => {
  const randomString = uuid4();
  return sha256(randomString).toString();
};

export const JWT_SECRET = process.env.JWT_SECRET || generateSecretKey();
export const PORT = process.env.PORT || 5000;

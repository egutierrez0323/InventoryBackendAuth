import { hash, compare } from 'bcrypt';

export const Encrypt = async (text: string) => {
  const hashed = await hash(text, 10);
  return hashed;
};

export const Compare = async (
  passwordPlain: string,
  hashedPassword: string,
) => {
  return await compare(passwordPlain, hashedPassword);
};

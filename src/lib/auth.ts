import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET || 'secret-key-reels-platform';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const VALID_USERNAMES = ['Anand', 'Jayprakashbajaj'];
  const VALID_PASSWORD = process.env.ADMIN_PASSWORD || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  if (typeof username === 'string' && VALID_USERNAMES.includes(username) && password === VALID_PASSWORD) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ username, expires });

    (await cookies()).set('session', session, { expires, httpOnly: true });
    return true;
  }
  return false;
}

export async function logout() {
  (await cookies()).set('session', '', { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

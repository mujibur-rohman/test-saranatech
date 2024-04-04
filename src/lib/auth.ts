import { SignJWT, jwtVerify } from "jose";
import Cookies from "js-cookie";

const secretKey = "SECRET";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("10 sec from now").sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(data: any) {
  const session = await encrypt({
    data,
  });

  Cookies.set("session", session);
}

export async function logout() {
  Cookies.remove("session");
}

export async function getSession() {
  const session = Cookies.get("session");
  if (!session) return null;
  return await decrypt(session);
}

// export async function updateSession() {
//   const session = Cookies.get("session");
//   if (!session) return;

//   const parsed = await decrypt(session);
//   login(parsed);
// }

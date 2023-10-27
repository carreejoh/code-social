export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'

export async function PostUser(username, email, password) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const userToken = await response.json();
    return userToken;
  } catch (err) {
    console.error(err + " Error posting new user");
  }
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://workspace.crpdiablos.repl.co';

type CheckoutArgs = { amount: number; currency: string; success_url: string; cancel_url: string; };

export async function createCheckoutSession(args: CheckoutArgs) {
  const res = await fetch(`${API_URL}/api/tips/stripe/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json() as Promise<{ url?: string; id?: string }>
}

export async function createPayPalOrder(args: { amount: number; return_url: string; cancel_url: string }) {
  const res = await fetch(`${API_URL}/api/paypal/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json() as Promise<{ approveUrl?: string }>
}

export async function pingHealth() {
  const res = await fetch(`${API_URL}/api/health`);
  return { status: res.status, text: await res.text() };
}

import { useState } from 'react'
import { createCheckoutSession, createPayPalOrder, pingHealth } from '@/lib/api'

export default function TipCard() {
  const [amount, setAmount] = useState(500) // cents
  const [loading, setLoading] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)

  async function stripe() {
    try {
      setLoading('stripe')
      setMsg(null)
      const data = await createCheckoutSession({
        amount, currency: 'usd',
        success_url: 'https://asskfans.com/tip/success',
        cancel_url: 'https://asskfans.com/tip/cancel',
      })
      if (data.url) window.location.href = data.url
      else setMsg('No Stripe checkout URL returned.')
    } catch (e: any) {
      setMsg(e.message || 'Stripe error')
    } finally {
      setLoading(null)
    }
  }

  async function paypal() {
    try {
      setLoading('paypal')
      setMsg(null)
      const usd = (amount/100).toFixed(2)
      const data = await createPayPalOrder({
        amount: amount, // cents (backend may expect dollars; adjust backend accordingly)
        return_url: 'https://asskfans.com/tip/success',
        cancel_url: 'https://asskfans.com/tip/cancel',
      })
      if (data.approveUrl) window.location.href = data.approveUrl
      else setMsg('No PayPal approve URL returned (ensure /api/paypal/create-order exists).')
    } catch (e: any) {
      setMsg(e.message || 'PayPal error')
    } finally {
      setLoading(null)
    }
  }

  async function health() {
    const r = await pingHealth()
    setMsg(`Health ${r.status}: ${r.text}`)
  }

  return (
    <div className="card">
      <h1 className="text-3xl font-bold mb-2">Tip the Ass King</h1>
      <p className="text-neutral-400 mb-6">Choose an amount and pick a checkout.</p>

      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-neutral-300">Amount</label>
        <select
          className="bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value, 10))}
        >
          <option value={500}>$5</option>
          <option value={1000}>$10</option>
          <option value={2000}>$20</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onClick={stripe} disabled={!!loading} className="btn">{loading==='stripe'?'Starting…':'Pay with Stripe'}</button>
        <button onClick={paypal} disabled={!!loading} className="btn">{loading==='paypal'?'Starting…':'Pay with PayPal'}</button>
      </div>

      <button onClick={health} className="mt-4 text-sm underline">Check backend health</button>

      {msg && <p className="mt-3 text-sm text-neutral-400">{msg}</p>}
      <p className="text-xs text-neutral-500 mt-3">Secure checkout via Stripe • Optional PayPal</p>
    </div>
  )
}

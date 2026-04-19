import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getCatalog } from '../../../lib/catalog';

export async function POST(req) {
  try {
    const catalog = await getCatalog();
    const formData = await req.formData();
    const headersList = await headers();
    const origin = headersList.get('origin');

    const paymentFrequency = formData.get('paymentFrequency');

    const cart = Object.entries(catalog).map(e=>[parseInt(formData.get(e[0])),e[1][paymentFrequency].id]).filter(e=>e[0] != 0);
    let line_items = [];
    cart.forEach(e=>{
      line_items.push({price:e[1],quantity:e[0]});
    });

    const session = await stripe.checkout.sessions.create({
      mode:'subscription',
      metadata:{oneYearSchedule:'monthly'},
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      line_items: line_items
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
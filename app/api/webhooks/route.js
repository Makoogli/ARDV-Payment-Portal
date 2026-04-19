import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST(req) {
  let event

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      (await headers()).get('stripe-signature'),
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    const errorMessage = err.message
    // On error, log and return the error message.
    if (err) console.log(err)
    console.log(`Error message: ${errorMessage}`)
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }

  const permittedEvents = ['checkout.session.completed']

  if (permittedEvents.includes(event.type)) {
    let data

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          data = event.data.object;

          if(data.mode == 'subscription' && data.metadata.oneYearSchedule != undefined){
            applyOneYearSchedule(data.subscription,data.metadata.oneYearSchedule);
          }
          console.log(`CheckoutSession status: ${data.payment_status}`)
          break
        default:
          throw new Error(`Unhandled event: ${event.type}`)
      }
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { message: 'Webhook handler failed' },
        { status: 500 }
      )
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: 'Received' }, { status: 200 })
}

async function applyOneYearSchedule(subscriptionID,paymentFrequency){
  let iterations;
  if(paymentFrequency == 'monthly'){
    iterations = 12;
  }else if(paymentFrequency == 'yearly'){
    iterations = 1;
  }
  //works for carts with any quantity of one subscription product
  const schedule = await stripe.subscriptionSchedules.create({
    from_subscription:subscriptionID
  });
  await stripe.subscriptionSchedules.update(
    schedule.id,
    {
      end_behavior:'cancel',
      phases:[
        {
          automatic_tax:{
            enabled:false
          },
          currency:'usd',
          items:schedule.phases[0].items,
          iterations:iterations,
          start_date:schedule.phases[0].start_date
        }
      ]
    }
  );
}
import {InputFormData} from './components/form_data';

import { getCatalog } from '../lib/catalog';

import css from './styles/main.css';

export default async function IndexPage({ searchParams }) {
  const { canceled } = await searchParams;
  const catalog = await getCatalog();

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and checkout when you’re ready.'
    )
  }
  return (
    <form action="/api/checkout_sessions" method="POST">
      <InputFormData catalog={catalog}/>
      <button type="submit" role="link">
        Checkout
      </button>
    </form>
  )
}
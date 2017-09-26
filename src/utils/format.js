export default function formatPrice(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

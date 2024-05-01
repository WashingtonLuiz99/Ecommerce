export default interface ICartItem {
  id?: number;
  amount: number;
  value: number;

  stock: {
    id: number;
    title: string;
    value: number;
    image: string;
  };
}

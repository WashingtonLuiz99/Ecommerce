import { type IProduct } from '@/app/interfaces/IProduct';
import api from '@/app/services/api';

export async function getAllProducts() {
  try {
    const data = await api.get('/products');

    return data.data as IProduct[];
  } catch (error) {
    throw new Error('Failed to fetch product.');
  }
}

export async function getProductById(id: number) {
  try {
    const response = await api.get(`/products/${id}`);

    const dataReturn: IProduct = response.data;

    return dataReturn;
  } catch (error) {
    throw new Error('Failed to fetch product.');
  }
}

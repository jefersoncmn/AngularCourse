import { Department } from './department.model';

export interface Product {
    id?: number;
    name: string;
    price: number;
    description: string;
    department: Department;
} 
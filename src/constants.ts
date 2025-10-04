export const API_URL: string = 'http://localhost:5000';



export interface Meal {
    id: number;
    name: string;
    price: number;
    image: string;
    type: string;
}



export interface User {
    id: number;

    usernmae: string;

    email: string;

    phonenumber: string;

    location: string;

    isemployee: boolean;

    employeetype: string;

    isvalidate: boolean;
}
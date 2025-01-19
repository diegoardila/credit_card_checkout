export interface ProductDetailScreenProps {
    route: {
        params: {
            id: number;
            title: string;
            price: number;
            description: string;
            image: string;
        };
    };
}
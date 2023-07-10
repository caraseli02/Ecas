export interface FavouriteFolderRequestInterface {
    name: string;
    isFolder?: boolean;
    parent?: string;
    products: { id: string; stock: number }[] | { id: string; stock: number };
}

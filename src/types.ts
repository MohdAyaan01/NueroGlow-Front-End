export interface User {
    _id: string;
    username?: string;
    name?: string;
    email: string;
    credit?: number;
}

export interface Creation {
    _id: string;
    content: string;
    prompt: string;
    type: 'article' | 'blog-title' | 'image';
    likes: string[];
    createdAt?: string;
    updatedAt?: string;
}

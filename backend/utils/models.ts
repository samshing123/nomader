export interface User {
    id?: number;
    username: string;
    password: string;
    first_name?: string;
    last_name?: string;
    birthday?: string;
    gender?: string;
    information?: string;
    profile?: string;
    email?: string;
    phone_num?: number;
    job_id?: number;
    country_id?: number;
    isAdmin?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface Interest {
    id: number;
    title: string;
}

export interface Post {
    username?: string;
    profile?: string;
    id?: number;
    user_id: number;
    title: string;
    content: string;
    image: string;
    created_at?: string;
}

export interface BrowseCount {
    user_id: number;
    post_id: number;
}

export interface AttractionPost {
    id: number;
    name: string;
    description?: string;
    image?: string;
    address?: string;
    open_time?: string;
    city_list?: string;
}

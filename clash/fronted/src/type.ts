type ClashFormType = {
    title?: string;
    description?: string;
}

type ClashFormTypeError = {
    title?: string;
    description?: string;
    image?: string;
    expires_at?: string;
}

type ClashType = {
    id: number;
    user_id: number;
    title: string;
    description?: string;
    image?: string;
    created_at: string;

    expires_at: string;
};
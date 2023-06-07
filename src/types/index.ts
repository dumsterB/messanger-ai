export interface MessangerConfig{
    holder?: string;
    tools?: any;
    socials?: Socials[],
    placeholder?: string;
    title?: string;
    token?: string;
    name?: string;
}

export interface Socials{
    type:string,
    link:string
}
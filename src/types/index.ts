export interface MessangerConfig{
    api_key: string,
    holder: string;
    tools: any;
    socials: Socials[],
    placeholder: string;
    title: string;
}

export interface Socials{
    type:string,
    link:string
}
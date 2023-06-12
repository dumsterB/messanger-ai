export interface MessangerConfig {
  holder: string;
  tools?: any;
  socials?: Socials[];
  token: string;
  image?:string;
  name?: string;
}

export interface Socials {
  type: string;
  link: string;
}
export interface dataMessage{
  message:string,
  token:string,
}

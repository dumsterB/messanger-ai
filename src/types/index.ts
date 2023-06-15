export interface MessangerConfig {
  holder: string;
  socials?: Socials[];
  token: string;
  picture?:string;
  name?: string;
  color?:string;
  header_background?:string
}

export interface Socials {
  type: string;
  link: string;
}
export interface dataMessage{
  message:string,
  token:string,
}

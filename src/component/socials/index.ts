import { Socials } from "../../types/index";
import {
  instagram,
  telegram,
  message,
  support,
  left,
  right,
  twitter,
  facebook,
} from "../../utils/icons";
import "./index.css";

export default function SocialMedias(params: Socials): string {
  const content = `
    <div>
      <div class="max-w-2xl">
        <div class="grid grid-cols-5 gap-1 socials flex mt-2 border-b-2">
             <div class="social-item"> 
            <div class="social-icon"> 
              ${message}
            </div>
            <p class="social-name">Написать AI</p>
          </div>
          <div class="social-item">
            <div class="social-icon">
              ${support}
            </div>
            <p class="social-name">Support</p>
          </div>
          <div class="social-item">
            <div class="social-icon"> 
              ${instagram}
            </div>
            <p class="social-name">Instagram</p>
          </div>
          <div class="social-item">
            <div class="social-icon"> 
              ${telegram}
            </div>
            <p class="social-name">Telegram</p>
          </div>
          <div class="social-item">
            <div class="social-icon"> 
              ${support}
            </div>
            <p class="social-name">Support</p>
          </div>
            <div class="social-item">
            <div class="social-icon"> 
              ${twitter}
            </div>
            <p class="social-name">Twitter</p>
          </div>
            <div class="social-item">
            <div class="social-icon"> 
              ${facebook}
            </div>
            <p class="social-name">Facebook</p>
          </div>
         </div>   
        </div>
      </div>
    </div>
  `;

  return content;
}

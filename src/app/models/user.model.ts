import { SocialMedia } from './social.model';
export class User {
    uid?:string;
    userName?: string;
    password?: string;

    photoURL?: string;

    firstName?: string;
    lastName?: string;

    email?: string;

    displayPhoneNumber?: boolean;
    phoneNumber?: number;

    displayProfileEmail?: boolean;
    profileEmail?:string;

    displayTextNumber?: boolean;
    textNumber?: boolean;

    isActive?: boolean; // profile active

    hasRedirect?: boolean;
    redirect?: string; // location
    qrCode?: string; // location

    activeTemplate?: string // theme name

    hasResume?: boolean //
    resumeLocation?: string 

    hasPortfolio?: boolean;
    portfolio?: string;

    bio?: string;
    jobTItle?: string;

    userTier?: string;
    currentTheme?: string;

    socialMedia?:any;
    constructor() {
        this.socialMedia = Object.assign({},new SocialMedia());
        this.displayPhoneNumber = false;
        this.displayProfileEmail = false;
        this.displayTextNumber = false;
        this.hasRedirect = false;
        this.hasResume = false;
        this.hasPortfolio = false;
    }
}
// resume 
// portfolio
// gallery
// music

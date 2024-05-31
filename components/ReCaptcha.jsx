"use client";

import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

const ReCaptcha = ({children, reCaptchaKey}) => {
    return <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>{children}</GoogleReCaptchaProvider>;
};

export default ReCaptcha;

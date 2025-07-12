export function checkAccessLogic(geoData, accessRules) {
    if (geoData.status !== 'success') {
        return {
            accessGranted: true, // Default to granted on API error as per original logic
            title: "Access Granted",
            message: "Could not verify location due to an API error. Access granted by default.",
            color: "orange",
            icon: "fa-exclamation-triangle",
            flagUrl: "",
        };
    }

    const country = geoData.country || 'Unknown';
    const countryCode = geoData.countryCode || 'UN';
    const isVpn = geoData.proxy || false;
    const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;

    if (isVpn && !accessRules.allow_vpn) {
        return {
            accessGranted: false,
            title: "Access Denied",
            message: "For security reasons, VPNs and proxies are not allowed on this website.",
            color: "red",
            icon: "fa-ban",
            flagUrl,
        };
    }

    if (accessRules.only && accessRules.only.length > 0) {
        if (accessRules.only.includes(country)) {
             return { accessGranted: true, title: "Welcome!", message: "Access granted.", color: "green", icon: "fa-check-circle", flagUrl };
        } else {
             return { accessGranted: false, title: "Access Denied", message: "This content is only available to visitors from specific countries.", color: "red", icon: "fa-times-circle", flagUrl };
        }
    }

    if (accessRules.block && accessRules.block.includes(country)) {
        return { accessGranted: false, title: "Access Denied", message: `We're sorry, but visitors from ${country} are restricted.`, color: "red", icon: "fa-times-circle", flagUrl };
    }

    if (accessRules.allow && accessRules.allow.length > 0 && !accessRules.allow.includes(country)) {
        return { accessGranted: false, title: "Access Denied", message: `We're sorry, but visitors from ${country} are not on our list of allowed countries.`, color: "red", icon: "fa-times-circle", flagUrl };
    }
    
    return { accessGranted: true, title: "Access Granted", message: "Welcome! You have successfully passed the security check.", color: "green", icon: "fa-check-circle", flagUrl };
}
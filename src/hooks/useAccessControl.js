import { useState, useEffect } from 'react';
import { checkAccessLogic } from '../logic/checkAccessLogic';

export function useAccessControl({ configPath = '/access.json' }) {
    const [accessState, setAccessState] = useState({
        isLoading: true,
        isGranted: false,
        statusInfo: null,
    });

    useEffect(() => {
        const performAccessCheck = async () => {
            try {
                const [geoResponse, rulesResponse] = await Promise.all([
                    fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,proxy'),
                    fetch(configPath)
                ]);

                if (!geoResponse.ok || !rulesResponse.ok) {
                    throw new Error('Failed to fetch required resources.');
                }
                
                const geoData = await geoResponse.json();
                const accessRules = await rulesResponse.json();
                const result = checkAccessLogic(geoData, accessRules);
                
                setAccessState({ isLoading: false, isGranted: result.accessGranted, statusInfo: result });
            } catch (error) {
                console.error("Access Check Error:", error);
                setAccessState({
                    isLoading: false,
                    isGranted: false,
                    statusInfo: {
                        title: "System Error",
                        message: "Could not perform the access check. Please try again later.",
                        color: "orange",
                        icon: "fa-exclamation-triangle",
                    }
                });
            }
        };
        performAccessCheck();
    }, [configPath]);

    return accessState;
}
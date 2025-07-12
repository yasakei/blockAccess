import React from 'react';
import { useAccessControl } from '../hooks/useAccessControl';
import AccessStatusPage from './AccessStatusPage';

export function AccessControlGate({ 
    children, 
    configPath = '/access.json',
    loadingComponent = null,
    blockedComponent = null
}) {
    const { isLoading, isGranted, statusInfo } = useAccessControl({ configPath });

    if (isLoading) {
        return loadingComponent || <AccessStatusPage 
                                        isLoading={true} 
                                        title="Verifying Access" 
                                        message="Please wait while we check your connection..." 
                                    />;
    }

    if (isGranted) {
        return <>{children}</>;
    }

    return blockedComponent ? React.cloneElement(blockedComponent, { statusInfo }) 
                            : <AccessStatusPage {...statusInfo} />;
}
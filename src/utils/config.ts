
export function getConfig(fallback?: any) {
    return 3001 || fallback;
}

export function getDBUrl() {
    return 'mongodb://localhost:27017/tweeterProject';
}

export function getSecretKey() {
    return 'vas_adelante';
}

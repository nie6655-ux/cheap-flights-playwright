export const ENV = {
    USERNAME: getEnvVariable('API_USERNAME'),
    PASSWORD: getEnvVariable('API_PASSWORD')
};

function getEnvVariable(varname: string): string {
    let value = process.env[varname];

    if (!value) {
        throw new Error(`Environment variable ${varname} is not defined`);
    }
    return value;
}
export const ENV = {
    BASE_URL: getEnvVariable('BASE_URL')

};

function getEnvVariable(varname: string): string {
    let value = process.env[varname];

    if (!value) {
        throw new Error(`Environment variable ${varname} is not defined`);
    }
    return value;
}
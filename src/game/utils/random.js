export const byConfig = (config, prev = 0) => {
    const number = Math.random();
    for (const [value, chance] of config) 
        if (number > prev && number < (prev += chance)) 
            return value;
}
export const inRange = (min, max) => 
    Math.floor(Math.random() * (max - min)) + min;

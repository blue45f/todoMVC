const token: Function = (): string =>
    Math.floor((Math.random() + 1) * 0x10000)
        .toString(16)
        .substring(1);

export const guid: Function = (): string => [token() + token(), token(), token(), token(), token() + token()].join("-");

export const clone: any = (object: any) => JSON.parse(JSON.stringify(object));

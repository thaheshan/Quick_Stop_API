export declare function generateOtp(): string;
export declare function hashOtp(plainCode: string): Promise<string>;
export declare function verifyOtp(plainCode: string, hash: string): Promise<boolean>;
export declare function normaliseToE164(phone: string): string;

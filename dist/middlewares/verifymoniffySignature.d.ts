import { Request, Response, NextFunction } from "express";
/**
 * Monnify signs every webhook payload with HMAC-SHA512
 * using your secret key. We verify the signature before
 * touching the database.
 *
 * Header sent by Monnify: "monnify-signature"
 */
export declare const verifyMonnifySignature: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=verifymoniffySignature.d.ts.map
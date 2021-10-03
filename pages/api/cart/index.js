import { query } from "../../../lib/db";
import { verifyToken } from "../../../lib/auth";

export default async function handler(req, res) {

    if (req.method === "GET") {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }

        const verifiedToken = verifyToken(authorization);
        console.log(`GET CART VERIFIEDTOKEN : ${verifiedToken}`);
        if (verifiedToken && verifiedToken.role === "admin") {
            const results = await query("SELECT * FROM cart");
            res.status(results.status.code).json(results);
        }
        else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }
    }

    if (req.method === "POST") {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }
        const verifiedToken = verifyToken(authorization);
        console.log(`POST CART VERIFIEDTOKEN : ${verifiedToken}`);
        if (verifiedToken) {
            const { products } = req.body;
            const results = await query("INSERT INTO cart ( userid ,  products ) VALUES (?,?)",
                [verifiedToken.id, JSON.stringify(products)]);
            console.log(query);
            res.status(204).json(results);
        }


        else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }

    }

}
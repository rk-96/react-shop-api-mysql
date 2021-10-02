import { query } from "../../../lib/db";
import { verifyToken } from "../../../lib/auth";

export default async function handler(req, res) {

    if (req.method === "GET") {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }

        const verifiedToken = verifyToken(authorization);
        if (verifiedToken && verifiedToken.role === "admin") {
            const results = await query("SELECT * FROM cart");
            res.status(results.status.code).json(results);
        }
        else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }
    }

    if (req.method === "POST") {
        const { apikey } = req.headers;
        const { id, title, price, description, image, category } = req.body;

        if (verifyToken(apikey)) {
            const results = await query("INSERT INTO  product ( id ,  title ,  price ,  description ,  image ,  category ) VALUES (?,?,?,?,?,?)",
                [id, title, price, description, image, category]);
            console.log(query);
            res.status(204).json(results);
        }
        else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }

    }

}
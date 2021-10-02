import { query } from "../../../lib/db";

import { checkapiKey } from "../../../lib/auth";

export default async function handler(req, res) {

    if (req.method === "GET") {
        const { apikey } = req.headers;
        const { category } = req.query;
        if (checkapiKey(apikey)) {
            const results = await query("SELECT * FROM product WHERE category=?", category);
            res.status(200).json(results);
        }
        else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }

    }



}
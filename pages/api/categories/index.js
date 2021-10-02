import { query } from "../../../lib/db";

import { checkapiKey } from "../../../lib/auth";

export default async function handler(req, res) {

    if (req.method === "GET") {
        const { apikey } = req.headers;
        if (checkapiKey(apikey)) {
            const results = await query("SELECT DISTINCT category FROM product");
            res.status(results.status.code).json(results);
        }
        else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }
    }

}
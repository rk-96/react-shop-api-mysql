import { query } from "../../../lib/db";

import { checkapiKey } from "../../../lib/auth";

export default async function handler(req, res) {

    if (req.method === "GET") {
        const { apikey } = req.headers;
        if (checkapiKey(apikey)) {
            const results = await query("SELECT * FROM product");
            res.status(results.status.code).json(results);
        }
        else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }
    }

    if (req.method === "POST") {
        const { apikey } = req.headers;
        const { id, title, price, description, image, category } = req.body;

        if (checkapiKey(apikey)) {
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
import { query } from "../../../lib/db";

import { checkapiKey } from "../../../lib/auth";

import httpStatus from "http-status";

export default async function handler(req, res) {

    if (req.method === "GET") {
        const { apikey } = req.headers;
        const { proid } = req.query;
        if (checkapiKey(apikey)) {
            const results = await query("SELECT * FROM product WHERE id=?", proid);
            res.status(200).json(results);
        }
        else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }

    }

    if (req.method === "PUT") {
        const { apikey } = req.headers;
        const { proid } = req.query;
        const { id, title, price, description, image, category } = req.body;

        if (checkapiKey(apikey)) {
            try {
                const results = await query("UPDATE product SET title=?, price=?, description=?, image=?, category=? WHERE id=?",
                    [title, price, description, image, category, proid]);
                console.log(query);
                res.status(200).json(results);
            } catch (error) {
                console.log("FAIL============");
                res.status(501);
            }
        }
        else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }
    }


    if (req.method === "DELETE") {
        const { apikey } = req.headers;
        const { proid } = req.query;

        if (checkapiKey(apikey)) {
            try {
                const results = await query("DELETE FROM product WHERE id=?", proid);
                console.log(query);
                res.status(200).json(results);
            } catch (error) {
                console.log("FAIL============");
                res.status(501);
            }
        }
        else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }
    }

}
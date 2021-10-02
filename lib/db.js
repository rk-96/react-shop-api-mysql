import serverlessMysql from "serverless-mysql";

export const db = serverlessMysql({
    config: {
        host: "localhost",
        database: "storeapi",
        user: "root",
        password: "my_secret_password",
        port: "6033"
    }
});

export async function query(query, params) {
    try {
        const results = await db.query(query, params);
        await db.end();
        return {status: {code:200, message: 'OK'}, data: results};
    } catch (e) {
        console.log(e);
        return {status:{code:400, message: 'Bad request'}};
    }
}
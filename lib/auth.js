import jwt from 'jsonwebtoken';

const APIKEY = "e555396ad0e7f074d62b90c5862b9e42";
const secretKEY = "MYSKEY"

export function checkapiKey(apikey) {
    if (apikey == APIKEY) {
        return true;
    }
    else {
        return false;
    }

}


export function verifyToken(token) {
    console.log(`your token ${token}`);
    const jwtToken = token.split(" ")[1];
    try {
        console.log(jwt.verify(jwtToken, secretKEY));
        return jwt.verify(jwtToken, secretKEY)
    } catch (error) {
        return false;
    }
}

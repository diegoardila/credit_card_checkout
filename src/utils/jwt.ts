import sign from 'jwt-encode';
import {jwtDecode} from 'jwt-decode';
import { JWT_SECRET_KEY } from '@env';


const SECRET_KEY = JWT_SECRET_KEY;

/**
 * Codifica un valor en un JWT y lo guarda en el localStorage.
 * @param value El valor que se codificará.
 * @returns El valor codificado o null si el token no es válido o ha expirado.
 */
export const encodeJWT = (value: string) => {
     return sign(value, SECRET_KEY);
};

/**
 * Decodifica un JWT desde el localStorage.
 * @param token La clave codificada.
 * @returns El valor decodificado o null si el token no es válido o ha expirado.
 */
export const decodeJWT = (token: string): object | null => {

    try {
        const decoded = jwtDecode(token);
        return decoded as object;
    } catch (error) {
        console.error('Invalid or expired token', error);
        return null;
    }
};

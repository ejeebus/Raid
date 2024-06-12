import { nanoid } from 'nanoid';

export const generateIdentifier = () => {
    return nanoid(32); // Generates a 32-character unique identifier
};

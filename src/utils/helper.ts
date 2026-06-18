import {storage} from '@utils/storage';
import {AUTH_KEY} from './constants';

export const transparent = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getToken = (): string | null => {
  const user = storage.getString(AUTH_KEY);
  if (user !== undefined && user !== null) {
    return JSON.parse(user).token;
  }
  return null;
};

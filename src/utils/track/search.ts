import { storage } from '@zsdx/mp-utils';

const localStorage = storage();

export const generateTrackSearchSession = () => {
    return new Date().getTime() + '_' + localStorage.get('uuid');
};

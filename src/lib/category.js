import { capitalize } from '@material-ui/core';

export const categories = ['Computer Science', 'Cybersecurity', 'Mathematics'];

export const slugify = (str) => str.toLowerCase().replace(' ', '_');

export const unslugify = (str) => str.split('_').map(capitalize).join(' ');

export const getCategoryUrl = (category) => `/category/${slugify(category)}`;

import { INavbar } from './interface/interface.INavbar';

export const NOTLOGGED: INavbar[] = [
    {
        link: '/login',
        title: 'Login',
        class: 'right',
    },
    {
        link: '/register',
        title: 'Register',
        class: 'right',
    },
];

export const LOGGED: INavbar[] = [
    {
        link: '/edit',
        title: 'Edit profile',
        class: 'right',
    },
    {
        link: '/document-add',
        title: 'Document',
        class: 'right',
    },
    {
        link: '/bookmarks',
        title: 'Bookmarks',
        class: 'right',
    },
];

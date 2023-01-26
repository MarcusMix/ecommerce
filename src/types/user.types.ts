interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    provide: 'firebase' | 'google';
}

export default User
type Tips = Record<'user' | 'admin' | 'god', {
    title: string;
    text: string;
}>

const tips: Tips = {
    user: {
        title: 'User',
        text: 'The user role does not have any special capabilities, this role is given to all rip registrations',
    },
    admin: {
        title: 'Admin',
        text: 'The admin role provides a number of options. A full description of this role can be found here',
    },
    god: {
        title: 'God',
        text: 'The God role provides full site management through the admin panel',
    },
};

export default tips;
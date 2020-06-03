import Home from "../pages/Home"
import StaticPage from "../pages/StaticPage"

const pages = {
    home: {
        url: '/',
        component: Home,
        displayInMenu: true,
        name: 'Home',
    },
    contacts: {
        url: '/contacts/',
        component: StaticPage,
        displayInMenu: true,
        name: 'Contacts'
    },
    delivery: {
        url: '/delivery/',
        component: StaticPage,
        displayInMenu: true,
        name: 'Delivery',
    },
    compare: {
        url: '/compare/',
        component: StaticPage,
        displayInMenu: false,
        name: 'Compare list',
    },
    favorites: {
        url: '/favorites/',
        component: StaticPage,
        displayInMenu: false,
        name: 'Favorits',
    },
    cart: {
        url: '/cart/',
        component: StaticPage,
        displayInMenu: false,
        name: 'Cart',
    },
    productDetail: {
        url: '/category/:slug',
        component: Home,
        displayInMenu: false,
        name: 'Category detail',
    },
    categoryDetail: {
        url: '/product/:slug',
        component: Home,
        displayInMenu: false,
        name: 'Product detail',
    },
}

export default pages
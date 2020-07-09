import Home from "../pages/Home"
import StaticPage from "../pages/StaticPage/StaticPage"
import ComparePage from "../pages/ComparePage/ComparePage"
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage"
import ProductPage from "../pages/ProductPage/ProductPage"


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
        component: ComparePage,
        displayInMenu: false,
        name: 'Compare list',
    },
    favorites: {
        url: '/favorites/',
        component: FavoritesPage,
        displayInMenu: false,
        name: 'Favorites',
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
        component: ProductPage,
        displayInMenu: false,
        name: 'Product detail',
    },
    any: {
        url: "",
        component: StaticPage,
        displayInMenu: false,
    },
}

export default pages
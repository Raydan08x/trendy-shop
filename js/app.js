import { Navbar } from './navbar.js';
import { Footer } from './footer.js';
import { SidebarMenu } from './sidebar.js';

const navbar = new Navbar();
navbar.render();

const footer = new Footer();
footer.render();

const sideBarMenu = new SidebarMenu ();
sideBarMenu.render();



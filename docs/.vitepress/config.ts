import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
import { initSidebar, initNav } from '../../utils/index';
import { homepage, name, description } from '../../package.json';
const menu = [
  {
    path: 'docs/css/',
    text: 'CSS',
    navConfig: {
      nav: undefined,
      showNav: true,
      showItem: true,
    },
  },
  {
    path: 'docs/html/',
    text: 'HTML',
    navConfig: {
      nav: undefined,
      showNav: true,
      showItem: false,
    },
  },
];
export default defineConfig({
  title: name,
  description,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }, ...initNav(menu)],
    sidebar: initSidebar(menu),
    socialLinks: [{ icon: 'github', link: homepage }],
  },
  base: `/${name}/`,
});

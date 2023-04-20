import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
import { initSidebar, initNav } from '../../utils/index';
import { homepage, name, description,logo } from '../../package.json';
export default defineConfig({
  title: name,
  description,
  themeConfig: {
    logo,
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }, ...initNav()],
    sidebar: initSidebar(),
    socialLinks: [{ icon: 'github', link: homepage }],
    outlineTitle: '当前页',
  },
  head: [
    ['link', { rel:'icon',href:logo}]
  ],
  base: `/${name}/`,
  vite: {
    plugins: []
  }
});

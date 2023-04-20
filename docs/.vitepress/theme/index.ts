import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent } from 'vue';
import './css/ol.css';
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    const requireModules = import.meta.glob(
      '../../components/global/**/*.vue'
    ) as unknown as Promise<typeof import('*.vue')>;
    for (const [path, module] of Object.entries(requireModules)) {
      const initPath = path.replace('/index.vue', '.');
      const name = initPath.slice(initPath.lastIndexOf('/') + 1, initPath.lastIndexOf('.'));
      app.component(name, defineAsyncComponent(module));
    }
  },
};

import fg from 'fast-glob';
import matter from 'gray-matter';

/** 获取文件
 * @param {(string|string[])} path
 * @return {*}
 */
const getFiles = (path: string): Array<{ text?: string; link?: string }> => {
  const files = fg.sync('docs/'+path);
  return files.reduce((pre: Array<{ text?: string; link?: string }>, file) => {
    const item = {
      text: file.replace(path, '').split('.')[0],
      link: file.replace('docs','').replace('/index.md','/').replace('.md', ''),
    };
    console.log(`item.link`, item.link);
    const { data } = matter.read(file);
    if (data.title) {
      item.text = data.title;
    }
    pre.push(item);
    return pre;
  }, []);
};
/** 初始化某个侧边栏
 * @param {{path:string,text:string}} {path,text}
 * @return {*}
 */
const initSidebarItem = ({
  path,
  text,
}: {
  path: string;
  text: string;
}): { text: string; items: Array<{ text?: string; link?: string }> } => {
  return {
    text,
    items: getFiles(path + '**/*.md'),
  };
};

export const initSidebar = (
  menu: Array<{
    path: string;
    text: string;
  }>
): any => {
  return menu.reduce(
    (pre, item) => {
      pre[ item.path] = [initSidebarItem(item)];
      return pre
    },
    {}
  );
};

export const initNav = (menu: any[]) => {
  return menu.reduce((pre, { path, text, navConfig }) => {
    const { showNav, showItem, nav } = navConfig;
    if (showNav) {
      if (nav) {
        pre.push(nav);
      } else {
        const item = initSidebarItem({ path, text });
        pre.push({
          text: item.text,
          items: showItem ? item.items : undefined,
          link:showItem ? undefined : path
        });
      }
    }
    return pre;
  }, []);
};

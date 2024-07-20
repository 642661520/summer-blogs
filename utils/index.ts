import fg from 'fast-glob';
import matter from 'gray-matter';
import { DefaultTheme } from 'vitepress';

const ignores = ['**/components'];
const initSidebarItem = (
  path: string,
  ignore: string[],
  deep: boolean
): DefaultTheme.SidebarItem[] => {
  const directories = fg.sync(path + '/*', { onlyDirectories: true, ignore });
  return directories.reduce((pre: DefaultTheme.SidebarItem[], directory) => {
    const files = fg.sync(directory + '/*.md', { onlyFiles: true });
    const items = [
      ...initSidebarItem(directory, ignore, deep),
      ...files.reduce((pre: DefaultTheme.SidebarItem[], file) => {
        const link=file.replace('docs', '').replace('/index.md', '/').replace('.md', '')
        const item = {
          text:link.slice(link.lastIndexOf('/') + 1).replace(/[0-9]+./, ''),
          link
        };
        const { data } = matter.read(file);
        if (data.title) {
          item.text = data.title;
        }
        pre.push(item);
        return pre;
      }, []),
    ];
    if (items.length > 0) {
      const isLink = deep ? deep : items.some(v => v.link);
      pre.push({
        text: directory.slice(directory.lastIndexOf('/') + 1).replace(/[0-9]+./, ''),
        items: isLink
          ? items
          : items.reduce((pre: DefaultTheme.SidebarItem[], item) => {
              if (item.items) {
                pre.push(...item.items);
              }
              return pre;
            }, []),
      });
    }
    return pre;
  }, []);
};

export const initNav = (
  path: string = 'docs',
  ignore: string[] = ignores
): DefaultTheme.NavItem[] => {
  const directories = fg.sync(path + '/*', { onlyDirectories: true, ignore });
  const nav = directories.reduce((pre: DefaultTheme.NavItem[], item) => {
    const items = initSidebarItem(item, ignore, false) as DefaultTheme.NavItemWithLink[];
    if (items.length > 0) {
      pre.push({
        text: item.replace(path + '/', '').replace(/[0-9]+./, ''),
        items,
      });
    }

    return pre;
  }, []);
  return nav;
};

export const initSidebar = (
  path: string = 'docs',
  ignore: string[] = ignores
): DefaultTheme.SidebarMulti => {
  const directories = fg.sync(path + '/*', { onlyDirectories: true, ignore });
  const sidebar = directories.reduce((pre, item) => {
    pre[item.replace(path, '') + '/'] = [
      {
        text: item.replace(path + '/', '').replace(/[0-9]+./, ''),
        items: initSidebarItem(item, ignore,true),
      },
    ];
    return pre;
  }, {});
  return sidebar;
};

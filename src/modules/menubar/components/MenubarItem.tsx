// Internal Dependencies
import { TActiveMenu } from '../../../common/types/AppState';
import { useAppState, useAppDispatch } from '../../../common/contexts/AppState';
import { PlusIcon } from '../../../common/components/icons/PlusIcon';
import { InfoIcon } from '../../../common/components/icons/InfoIcon';
import { CogIcon } from '../../../common/components/icons/CogIcon';

// Styles
import styles from './MenubarItem.module.css';

// Types + Interfaces
interface IMenubarItemProps {
  name: string;
  configKey: string;
}

type TIcons = {
  // eslint-disable-next-line no-undef
  [key: string]: JSX.Element;
};

// Constants
const ICONS: TIcons = {
  add: <PlusIcon />,
  about: <InfoIcon />,
  config: <CogIcon />,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MenubarItem({ name, configKey }: IMenubarItemProps) {
  const dispatch = useAppDispatch();
  const { sidebar } = useAppState();
  const icon = ICONS[configKey];

  const classesMenubar =
    sidebar.isOpen && configKey === sidebar.activeMenu
      ? `${styles.menubarItem} ${styles.menubarItemActive}`
      : `${styles.menubarItem}`;

  // Handlers
  function handleIconClick() {
    /* istanbul ignore else */
    if (!sidebar.isOpen) {
      dispatch({
        type: 'toggleSidebar',
      });
    }
    dispatch({ type: 'setActiveMenu', activeMenu: configKey as TActiveMenu });
  }

  return (
    <div data-testid={configKey} className={classesMenubar} onClick={() => handleIconClick()}>
      {icon}
    </div>
  );
}

export { MenubarItem };

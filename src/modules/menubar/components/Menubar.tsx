// External Dependencies
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

// Internal Dependencies
import { MENUBAR_OPTIONS } from '../../../common/constants';
import { ActiveMenu } from '../../../common/types/AppState';
import { useAppState, useAppDispatch } from '../../../common/contexts/AppState';

// Styles
import styles from './Menubar.module.css';

// Types
type Props = {
  name: string;
  configKey: string;
};

function MenubarItem(props: Props) {
  const dispatch = useAppDispatch();
  const { sidebar } = useAppState();
  let icon = <AddCircleOutlineOutlinedIcon />;

  switch (props.configKey) {
    case 'add':
      icon = <AddCircleOutlineOutlinedIcon fontSize="small" />;
      break;
    case 'about':
      icon = <InfoOutlinedIcon fontSize="small" />;
      break;
    case 'config':
      icon = <SettingsOutlinedIcon fontSize="small" />;
      break;
  }

  const classesMenubar = sidebar.isOpen && props.configKey === sidebar.activeMenu ? `${styles.menubarItem} ${styles.menubarItemActive}` : `${styles.menubarItem}`;

  // Handle Functions
  function handleIconClick() {
    /* istanbul ignore else */
    if (!sidebar.isOpen) {
      dispatch({
        type: 'toggleSidebar'
      });
    }
    dispatch({ type: 'setActiveMenu', activeMenu: props.configKey as ActiveMenu});
  }

  return (
    <div data-testid={props.configKey} className={classesMenubar} onClick={() => handleIconClick()}>
      {icon}
      <span className={styles.menuBarItemText}>{props.name}</span>
    </div>
  );
}

function Menubar() {
  return (
    <div className={styles.menubar}>
      {MENUBAR_OPTIONS.map((option) => {
        return (
          <MenubarItem name={option.title} configKey={option.key} key={option.key}/>
        );
      })}
    </div>
  );
}

export default Menubar;

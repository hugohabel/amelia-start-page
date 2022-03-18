// Internal Dependencies
import { MENUBAR_OPTIONS } from '../../../common/constants';
import { MenubarItem } from './MenubarItem';

// Styles
import styles from './Menubar.module.css';

/**
 * Menubar - Component to display the left side menu bar.
 */
function Menubar() {
  return (
    <>
      <div className={styles.menubar}>
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" className={styles.logo} />
        {MENUBAR_OPTIONS.map((option) => {
          return (
            <MenubarItem name={option.title} configKey={option.key} key={option.key}/>
          );
        })}
      </div>
    </>
  );
}

export { Menubar };

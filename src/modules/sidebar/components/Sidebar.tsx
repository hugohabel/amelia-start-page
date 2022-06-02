// Internal Dependencies
import { MENUBAR, ACTIONS } from '../../../common/constants';
import { useAppState, useAppDispatch } from '../../../common/contexts/AppState';
import { WidgetsList } from '../../widgetsList/components/WidgetsList';
import CountdownFormAddView from '../../countdownFormAddView/components/CountdownFormAddView';
import { CloseIcon } from '../../../common/components/icons/CloseIcon';

// Types
import { ISidebar } from '../../../common/types/AppState';

// Styles
import styles from './Sidebar.module.css';

// Utility Functions

function viewHandler(sidebar: ISidebar): number {
  let activeView = 0;

  if (sidebar.activeMenu === null) {
    activeView = 0;
  } else {
    activeView += MENUBAR[sidebar.activeMenu.toUpperCase()];
  }

  if (!sidebar.activeView || sidebar.activeView === null) {
    activeView += 0;
  } else {
    activeView += ACTIONS[sidebar.activeView.toUpperCase()];
  }

  return activeView;
}

function mapStateToView(activeView: number) {
  switch (activeView) {
    case 0:
      return null;
    case 1:
      return <WidgetsList />;
    case 11:
      return <CountdownFormAddView />;
    default:
      return null;
  }
}

function Sidebar() {
  const { sidebar } = useAppState();
  const dispatch = useAppDispatch();
  const sidebarClasses = sidebar.isOpen
    ? `${styles.sidebar} ${styles.isSidebarOpen}`
    : `${styles.sidebar}`;
  const sidebarInnerContainerClasses = sidebar.isOpen
    ? `${styles.sidebarInnerContainer} ${styles.sidebarInnerContainerOpen}`
    : `${styles.sidebarInnerContainer}`;

  // Handle Functions
  function handleCloseIconClick() {
    /* istanbul ignore else */
    if (sidebar.isOpen) {
      dispatch({
        type: 'toggleSidebar',
      });
      dispatch({
        type: 'setActiveMenu',
        activeMenu: null,
      });
      dispatch({
        type: 'setActiveView',
        activeView: null,
      });
    }
  }

  return (
    <div className={sidebarClasses}>
      {/* Close Icon */}
      <div
        data-testid="close-sidebar"
        className={styles.sidebarCloseIcon}
        onClick={() => handleCloseIconClick()}>
        <CloseIcon />
      </div>
      {/* End Close Icon */}

      {/* Main Sidebar View */}
      <div className={sidebarInnerContainerClasses}>{mapStateToView(viewHandler(sidebar))}</div>
      {/* End Main Sidebar View */}
    </div>
  );
}

export default Sidebar;

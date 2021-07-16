// External Dependencies
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';

// Internal Dependencies
import { WIDGETS_LIST } from '../../../common/constants';
import { useAppDispatch } from '../../../common/contexts/AppState';
import { ActiveView } from '../../../common/types/AppState';

// Styles
import styles from './WidgetsList.module.css';

// Utility functions
function mapWidgetNameToIcon(name: string) {
  let icon = null;

  switch (name) {
    case 'countdown':
      icon = <HourglassEmptyOutlinedIcon fontSize="small" />;
      break;
    case 'weather':
      icon = <WbSunnyOutlinedIcon fontSize="small" />;
      break;
    case 'timezone':
      icon = <WatchLaterOutlinedIcon fontSize="small" />;
      break;
  }

  return icon;
}

function WidgetsList() {
  const dispatch = useAppDispatch();

  // Handler Functions
  function handleListItemClick(widgetName: string) {
    dispatch({
      type: 'setActiveView',
      activeView: `add_${widgetName}` as ActiveView,
    });
  }

  return (
    <div className={styles.widgetsList}>
      <h2 className={styles.widgetsListTitle}>New widget</h2>
      <p className={styles.widgetsListSubtitle}>Select a widget from the list below</p>
      {WIDGETS_LIST.map((widget) => {
        const widgetsListItemClasses = widget.status === 1 ? `${styles.widgetsListItem}` : widget.status === -1 ? `${styles.widgetsListItemHidden}` : `${styles.widgetsListItem} ${styles.widgetsListItemUpcoming}`;

        return (
          <div data-testid={widget.name} className={widgetsListItemClasses} key={widget.name} onClick={() => { handleListItemClick(widget.name); }}>
            {mapWidgetNameToIcon(widget.name)}
            <span>{widget.title}</span>
            {widget.status === 0 && <span className={styles.widgetsListItemUpcomingTitle}>Upcoming!</span>}
          </div>
        );
      })}
    </div>
  );
}

export default WidgetsList;
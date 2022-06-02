// External Dependencies
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';

// Internal Dependencies
import { WIDGETS_LIST } from '../../../common/constants';
import { useAppDispatch } from '../../../common/contexts/AppState';
import { TActiveView } from '../../../common/types/AppState';

// Styles
import styles from './WidgetsList.module.css';

// Interfaces + Types
type TWidgetsIcons = {
  // eslint-disable-next-line no-undef
  [key: string]: JSX.Element;
};

const widgetsIcons: TWidgetsIcons = {
  countdown: <HourglassEmptyOutlinedIcon fontSize="small" />,
  weather: <WbSunnyOutlinedIcon fontSize="small" />,
  timezone: <WatchLaterOutlinedIcon fontSize="small" />,
};

function WidgetsList() {
  const dispatch = useAppDispatch();

  // Handler Functions
  function handleListItemClick(widgetName: string) {
    dispatch({
      type: 'setActiveView',
      activeView: `add_${widgetName}` as TActiveView,
    });
  }

  return (
    <div className={styles.widgetsList}>
      <h2 className={styles.widgetsListTitle}>New widget</h2>
      <p className={styles.widgetsListSubtitle}>Select a widget from the list below</p>
      {WIDGETS_LIST.map((widget) => {
        const widgetsListItemClasses =
          // eslint-disable-next-line no-nested-ternary
          widget.status === 1
            ? `${styles.widgetsListItem}`
            : widget.status === -1
            ? `${styles.widgetsListItemHidden}`
            : `${styles.widgetsListItem} ${styles.widgetsListItemUpcoming}`;

        return (
          <div
            data-testid={widget.name}
            className={widgetsListItemClasses}
            key={widget.name}
            onClick={() => {
              if (widget.status === 1) {
                handleListItemClick(widget.name);
              }
            }}>
            {widgetsIcons[widget.name]}
            <span>{widget.title}</span>
            {widget.status === 0 && (
              <span className={styles.widgetsListItemUpcomingTitle}>Upcoming!</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { WidgetsList };

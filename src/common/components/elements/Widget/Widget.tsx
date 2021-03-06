// Internal Dependencies
import { CloseIcon } from '../../icons/CloseIcon';
import { useAppDispatch } from '../../../contexts/AppState';

// Styles
import styles from './Widget.module.css';

// Types
interface IWidgetProps {
  // eslint-disable-next-line no-undef
  children: JSX.Element;
  style?: any;
  uuid: string;
  widgetType: string;
  editAction?: boolean;
}

/**
 * Main Widget Component
 *
 * This is the container that all widget will use to be displayed on the page.
 *
 * @param params IWidgetProps
 * @returns JSX
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Widget({ children, style, uuid, widgetType, editAction }: IWidgetProps) {
  const dispatch = useAppDispatch();

  // Handlers
  // eslint-disable-next-line no-shadow
  function handleRemove(uuid: string, widgetType: string) {
    dispatch({
      type: 'removeWidgetItem',
      uuid,
      widgetType,
    });
  }

  return (
    <>
      {/* Main Container */}
      <div style={style} className={styles.mainContainer}>
        {/* Inherited Content */}
        {children}

        {/* Widget Actions */}

        {/* @TODO: Edit action will be improved as part of separate ticket */}
        {/* editAction && (
          <div className={styles.actionEdit}>
            <EditAttributesOutlinedIcon fontSize="small" />
          </div>
        ) */}
        <div
          className={styles.actionRemove}
          onClick={() => {
            handleRemove(uuid, widgetType);
          }}
          data-testid={uuid}>
          <CloseIcon />
        </div>
        {/* End Widget Actions */}
      </div>
      {/* End Main Container */}
    </>
  );
}

export { Widget };

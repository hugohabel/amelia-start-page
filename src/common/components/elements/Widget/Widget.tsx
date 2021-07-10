// External Dependencies
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import EditAttributesOutlinedIcon from '@material-ui/icons/EditAttributesOutlined';

// Internal Dependencies
import { useAppDispatch } from '../../../contexts/AppState';

// Styles
import styles from './Widget.module.css';

// Types
type Props = {
  children: JSX.Element;
  style: any;
  uuid: string;
  widgetType: string;
  editAction: boolean;
};

function Widget(props: Props) {
  const dispatch = useAppDispatch();

  // Handler Functions
  function handleRemove(uuid: string, widgetType: string) {
    dispatch({
      type: 'removeWidgetItem',
      uuid: uuid,
      widgetType: widgetType
    });
  }

  return (
    <>
      { /* Main Container */ }
      <div style={props.style} className={styles.mainContainer}>
        { /* Inherited Content */ }
        {props.children}

        { /* Widget Actions */ }
        {props.editAction && 
          <div className={styles.actionEdit}>
            <EditAttributesOutlinedIcon fontSize="small" />
          </div>
        }
        <div className={styles.actionRemove}>
          <CloseOutlinedIcon data-testid={props.uuid} fontSize="small" onClick={() => { handleRemove(props.uuid, props.widgetType) }}/>
        </div>
        { /* End Widget Actions */ }
      </div>
      { /* End Main Container */ }
    </>
  );
}

export default Widget;

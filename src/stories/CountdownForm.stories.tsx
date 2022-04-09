// External Dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Internal Dependencies
import { CountdownForm } from '../modules/countdownForm/components/CountdownForm';

// Styles
import '../index.css';

export default {
  title: 'Forms/Countdown',
  component: CountdownForm,
  parameters: {
    backgrounds: {
      default: 'amelia',
      values: [
        {
          name: 'amelia',
          value: '#F7F7F7',
        },
      ],
    },
    docs: {
      page: null,
    },
  },
} as ComponentMeta<typeof CountdownForm>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof CountdownForm> = () => <CountdownForm />;

export const Add = Template.bind({});

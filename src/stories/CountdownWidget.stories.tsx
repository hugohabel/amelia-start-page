// External Dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Internal Dependencies
import { Widget } from '../common/components/elements/Widget/Widget';
import { CountdownWidget } from '../modules/countdown/components/CountdownWidget';

// Styles
import '../index.css';

export default {
  title: 'Countdown Widget',
  component: CountdownWidget,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    eventName: { control: 'text' },
    eventDate: { control: 'date' },
  },
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
} as ComponentMeta<typeof CountdownWidget>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof CountdownWidget> = (args) => (
  <Widget uuid="123" widgetType="countdown" key="123" editAction={false}>
    <CountdownWidget {...args} />
  </Widget>
);

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  eventName: 'Christmas',
  eventDate: '2022-12-25T05:00:00.000Z',
};

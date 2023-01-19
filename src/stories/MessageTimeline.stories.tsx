import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { MessageTimeline } from '../messages/MessageTimeline';

export default {
  title: 'MessageTimeline',
  component: MessageTimeline,
} as ComponentMeta<typeof MessageTimeline>;

const Template: ComponentStory<typeof MessageTimeline> = (args) => <MessageTimeline {...args} />;

export const Timeline1 = Template.bind({});
Timeline1.args = {
  // TODO
};

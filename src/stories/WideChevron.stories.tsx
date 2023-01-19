import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Color } from '../color';
import { WideChevron } from '../icons/WideChevron';

export default {
  title: 'WideChevron',
  component: WideChevron,
} as ComponentMeta<typeof WideChevron>;

const Template: ComponentStory<typeof WideChevron> = (args) => <WideChevron {...args} />;

export const BlueEastRounded = Template.bind({});
BlueEastRounded.args = {
  color: Color.Blue,
  direction: 'e',
  rounded: true,
  width: 50,
  height: 150,
};

export const BlackSouthUnrounded = Template.bind({});
BlackSouthUnrounded.args = {
  color: Color.Black,
  direction: 's',
  rounded: false,
  width: 50,
  height: 150,
};

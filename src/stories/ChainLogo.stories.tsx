import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ChainLogo } from '../icons/ChainLogo';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'ChainLogo',
  component: ChainLogo,
} as ComponentMeta<typeof ChainLogo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ChainLogo> = (args) => <ChainLogo {...args} />;

export const ColorChain = Template.bind({});
ColorChain.args = {
  chainId: 1,
  color: true,
  background: false,
};

export const ColorNoChain = Template.bind({});
ColorNoChain.args = {
  chainId: 0,
  color: true,
  background: false,
};

export const NoColorChain = Template.bind({});
NoColorChain.args = {
  chainId: 1,
  color: false,
  background: false,
};

export const NoColorNoChain = Template.bind({});
NoColorNoChain.args = {
  chainId: 0,
  color: false,
  background: false,
};

export const BackgroundColorChain = Template.bind({});
BackgroundColorChain.args = {
  chainId: 1,
  color: true,
  background: true,
};

export const BackgroundColorNoChain = Template.bind({});
BackgroundColorNoChain.args = {
  chainId: 0,
  color: true,
  background: true,
};

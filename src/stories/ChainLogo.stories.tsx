import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ChainLogo } from '../icons/ChainLogo';

export default {
  title: 'ChainLogo',
  component: ChainLogo,
} as ComponentMeta<typeof ChainLogo>;

const Template: ComponentStory<typeof ChainLogo> = (args) => <ChainLogo {...args} />;

export const ColorChain = Template.bind({});
ColorChain.args = {
  chainId: 1,
  color: true,
  background: false,
};

export const NoColorChain = Template.bind({});
NoColorChain.args = {
  chainId: 1,
  color: false,
  background: false,
};

export const BackgroundColorChain = Template.bind({});
BackgroundColorChain.args = {
  chainId: 1,
  color: true,
  background: true,
};

export const BackgroundNoColorChain = Template.bind({});
BackgroundNoColorChain.args = {
  chainId: 1,
  color: false,
  background: true,
};

export const JustChainName = Template.bind({});
JustChainName.args = {
  chainName: 'Ethereum',
};

export const JustChainId = Template.bind({});
JustChainId.args = {
  chainId: 422220,
};

export const ChainIdAndName = Template.bind({});
ChainIdAndName.args = {
  chainName: 'DopeChain',
  chainId: 422220,
};

export const ChainIdString = Template.bind({});
ChainIdAndName.args = {
  chainId: 'injective-1',
};

export const NoIdNoName = Template.bind({});
NoIdNoName.args = {};

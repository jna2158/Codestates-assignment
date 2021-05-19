import React from 'react';
import '../../dist/style.css'
import { fakeData } from '../components/__test__/fakeData'

import VideoList from '../components/VideoList';

export default {
  title: 'Components/VideoList',
  component: VideoList
};

const Template = (args) => <VideoList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  videos: fakeData
};

import React from 'react';
import '../../dist/style.css'
import { fakeData } from '../components/__test__/fakeData'

import VideoPlayer from '../components/VideoPlayer';

export default {
  title: 'Components/VideoPlayer',
  component: VideoPlayer
};

const Template = (args) => <VideoPlayer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  video: fakeData[0]
};

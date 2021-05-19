import React from 'react';
import '../../dist/style.css'
import { fakeData } from '../components/__test__/fakeData'

import VideoListEntry from '../components/VideoListEntry';

export default {
  title: 'Components/VideoListEntry',
  component: VideoListEntry
};

const Template = (args) => <VideoListEntry {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  video: fakeData[0]
};

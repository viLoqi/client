import { Icon } from "@iconify/react";

const width = 48;
const height = 48;

const smWidth = 24;
const smHeight = 24;

const ICONS: { [key: string]: React.ReactElement } = {
  google: <Icon icon="mdi:google" width={width} height={height} />,
  compass: <Icon icon="mdi:compass" width={width} height={height} />,
  bell: <Icon icon="mdi:bell-outline" width={smWidth} height={smHeight} />,
  faq: (
    <Icon
      icon="mdi:comment-question-outline"
      width={smWidth}
      height={smHeight}
    />
  ),
  search: (
    <Icon icon="mdi:layers-search-outline" width={smWidth} height={smHeight} />
  ),
};

export default ICONS;

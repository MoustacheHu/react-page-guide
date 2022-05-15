import React from 'react';
import createPageGuide from '../../src';

import styles from './index.less';

const Index = () => {
  // 触发引导页
  const handleBeginGuide = () => {
    const driver = createPageGuide({
      steps: [
        {
          element: '#top',
          popover: {
            title: 'Top Guide',
            description: 'Top',
            position: 'bottom'
          }
        },
        {
          element: '.middle',
          popover: {
            title: 'Middle Guide',
            description: 'Middle',
            position: 'top'
          }
        },
        {
          element: '#bottom',
          popover: {
            title: 'Bottom Guide',
            description: 'Bottom',
            position: 'top'
          }
        },
      ]
    });
    driver.start();
  };

  return (
    <div className={styles.container}>
      <div className={styles.btn} onClick={handleBeginGuide}>开始导航</div>
      <div className={styles.content}>
        <div id='top'>top</div>
        <div className='middle'>middle</div>
        <div id='bottom'>bottom</div>
      </div>
    </div>
  );
};

export default Index;
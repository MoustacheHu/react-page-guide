import React, { useEffect } from 'react';
import createPageGuide from '../../src';

import styles from './index.less';

const Index = () => {
  useEffect(() => {
    // 为了不影响 demo1 和 demo2，单独给 demo3 的 body 设置 hidden
    document.body.style.overflow = 'hidden';
  }, []);

  const handleBeginGuide = () => {
    document.getElementById('middle').scrollIntoView = null;
    const driver = createPageGuide({
      steps: [
        {
          element: '#middle',
          popover: {
            title: 'Middle Guide',
            description: 'Middle',
            position: 'top'
          }
        },
        {
          element: '#top',
          popover: {
            title: 'Top Guide',
            description: 'Top',
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
      ],
      onPrev: (_, step) => {
        if (step === 2) {
          driver.preventMove();
          document.getElementById('container').scrollTo(0, 0);
          driver.movePrevious();
        }
      },
    });
    driver.start();
  };

  return (
    <div className={styles.container}>
      <div className={styles.btn} onClick={handleBeginGuide}>开始导航</div>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div id="top" className={styles.top}>top</div>
          <div id="middle" className={styles.middle}>middle</div>
          <div id='bottom'>bottom</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
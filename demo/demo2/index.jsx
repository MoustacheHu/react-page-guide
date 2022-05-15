import React from 'react';
import createPageGuide from '../../src';

import styles from './index.less';

const Index = () => {
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
      ],
      onPrev: (_, step) => {
        driver.preventMove();
        if (step === 1) {
          document.getElementById('wrapper').scrollTo(0, 0);
        } else if (step === 2) {
          document.getElementById('wrapper').scrollTo(0, 400);
        }
        driver.movePrevious();
      },
      onNext: (_, step) => {
        if (step === 2) {
          driver.preventMove();
          document.getElementById('wrapper').scrollTo(0, 400);
          driver.moveNext();
        }
      }
    });
    driver.start();
  };

  return (
    <div id="container" className={styles.container}>
      <div className={styles.btn} onClick={handleBeginGuide}>开始导航</div>
      <div id="wrapper" className={styles.wrapper}>
        <div className={styles.content}>
          <div id='top'>top</div>
          <div className='middle'>middle</div>
          <div id='bottom'>bottom</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
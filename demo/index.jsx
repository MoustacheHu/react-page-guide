import React from 'react';
import { BrowserRouter, Outlet, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Demo1 from './demo1';
import Demo2 from './demo2';
import Demo3 from './demo3';

import styles from './index.less';

const IndexPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoToDemo = (route) => () => {
    navigate(route);
  };

  const { pathname } = location;
  return (
    <div id="container" className={`${styles.container} ${pathname === '/demo3' ? styles.container_ano : ''}`}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.pane}>
            <div
              className={`${styles.btn} ${pathname === '/demo1' ? styles.btn_active : ''}`}
              onClick={handleGoToDemo('/demo1')}
            >
              DEMO 1
            </div>
            <div className={styles.desc}>
              无需额外处理（页面无滚动条/需要引导的区域所产生的滚动条在body上）
            </div>
          </div>
          <div className={styles.pane}>
            <div
              className={`${styles.btn} ${pathname === '/demo2' ? styles.btn_active : ''}`}
              onClick={handleGoToDemo('/demo2')}
            >
              DEMO 2
            </div>
            <div className={styles.desc}>
              需要根据实际情况调整滚动条位置（需要引导的区域所产生的滚动条不在body上）
            </div>
          </div>
          <div className={styles.pane}>
            <div
              className={`${styles.btn} ${pathname === '/demo3' ? styles.btn_active : ''}`}
              onClick={handleGoToDemo('/demo3')}
            >
              DEMO 3
            </div>
            <div className={styles.desc}>
              需要根据实际情况调整滚动条位置（需要引导的区域所产生的滚动条不在body上）
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<IndexPage />}>
          <Route  path='demo1' element={<Demo1 />}/>
          <Route  path='demo2' element={<Demo2 />}/>
          <Route  path='demo3' element={<Demo3 />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Index />);
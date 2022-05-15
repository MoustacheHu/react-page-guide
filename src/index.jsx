import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import './index.less';

/**
 * @param props
 * @param options 可通过该参数覆盖 driver.js 的配置
 */
const createPageGuide = (props = {}, options = {}) => {
  const {
    steps = [], // 引导步骤数据
    onPrev,
    onNext,
    onFinish,  // 点击跳过、完成按钮时都会触发
    showStep = true, // 是否展示计数，默认展示
  } = props;

  let step = 1; // 用于步骤计数
  const totalStep = steps?.length; // 引导页总步骤数

  if (!totalStep) {
    console.error('引导数据不能为空');
    return;
  }

  // 上一步、下一步
  const handleStep = (num, callback) => (ele) => {
    step += num; // 当前操作后的步数

    // 引导页需要计数
    if (showStep && !options?.closeBtnText) {
      setTimeout(() => {
        document.getElementsByClassName('driver-close-btn')[0].innerHTML = `跳过(${step}/${totalStep})`;
      }, 500);
    }

    if (typeof callback === 'function') callback(ele, step);
  };

  const driver = new Driver({
    className: 'custom-driver-box',
    closeBtnText: `跳过${showStep ? `(${step}/${totalStep})` : ''}`,
    prevBtnText: '上一步',
    nextBtnText: '下一步',
    doneBtnText: '完成',
    opacity: 0.6,
    padding: 0,
    allowClose: false,
    onPrevious: handleStep(-1, onPrev),
    onNext: handleStep(1, onNext),
    onReset: () => {
      if (typeof onFinish === 'function') onFinish();
    },
    ...options
  });

  driver.defineSteps(steps);

  // eslint-disable-next-line consistent-return
  return driver;
};

export default createPageGuide;

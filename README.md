#### 1. 安装
通过 yarn/npm 安装 react-page-guide
```
yarn add react-page-guide -S
npm install react-page-guide -S
```

#### 2. 使用
react-page-guide 的用法和 [driver.js](https://github.com/kamranahmedse/driver.js) 基本保持一致
```
import createPageGuide from 'react-page-guide';

const driver = createPageGuide(props, options);

driver.start();
```

1.props 包含一下参数：

| 参数 | 描述 |
| --- | --- |
| steps | 引导数据对象，实际上就是[driver.defineSteps(steps)](https://github.com/kamranahmedse/driver.js) 中的 steps |
| onPrev(element, step) | 上一步动作触发函数，step 表示当前动作触发后的步骤数 |
| onNext(element, step) | 下一步动作触发函数 |
| onFinish() | 跳过、完成动作触发函数；相当于 driver.js 中的 onReset |
| showStep | 是否展示步骤计数 |

2.optinos 参数和 driver.js 的构造函数传参一致，可以覆盖  props 中的 onPrev/onNext/onFinish

**props 中的 onPrev/onNext 与 options 中的不同，加上了计数功能**
![000888f921481c7827d6a5026880cc89.png](en-resource://database/1148:1)


#### 3. 例子

##### 1.例1
页面代码如下所示，这就是一个布局非常简单的页面，通过按钮触发对 top、middle、bottom 三块区域的引导
![dbe6996e9c370695710d1ba1b899b0a6.png](en-resource://database/1150:1)
![4422ae8547d94b5d69e13b5a7b241da5.png](en-resource://database/1152:1)

![1b35d00059bbf12799b5c4be19b92491.gif](en-resource://database/1154:1)


##### 2.例2
事实上例1是比较顺利的场景，大多数场景下可能需要我们做一些额外的工作来保证引导组件的正常进行。相对于例1中页面滚动处于 body 的位置，例2中固定了 body 为浏览器可视区域的高度禁止滚动，滚动区域被放在了名为 wrapper 的 div 上。此时我们不仅需要在开始时对重置初始位置；还要在进行“下一步”、“上一步”动作中间进行阻断，对引导的位置进行校正。

![fe2bfc9e850582a667b94e67d39bdb8e.png](en-resource://database/1166:1)
![5973cb613d73dc6f0e0b8b4055300397.png](en-resource://database/1158:1)

以下 gif 中是校正前的表现

![2a9479aa148e5c750bb7789561f18003.gif](en-resource://database/1162:1)


校正后的表现

![e9862682051e2434ba8c3a246a8a3f51.gif](en-resource://database/1168:1)


#### 3.例3

例3也做了一些额外的处理，但又有些不同于例2。首先在开始前先禁止了 middle 区域的滚动事件，其后在操作“上一步”回到 middle 所在引导块时又对 container 进行了操作。
![0fb1d28611cb5c2f0a2c536647780b15.png](en-resource://database/1170:1)

校正前

![661ddd51b677feb7879df10f55fd8b13.gif](en-resource://database/1172:1)

校正后

![47ab4db4cc2fffaae6e3b74ac0619b35.gif](en-resource://database/1174:1)

#### 4. 造成使用异常的原因

造成使用异常的原因主要是 driver.js 中代码逻辑无法覆盖实际场景。
首先可以从 [onHighlighted](https://github.com/kamranahmedse/driver.js/blob/0b31fb753d01cdebff5c9b4feb8c466586b387d0/src/core/element.js#L192) 函数入手，首先该函数内调用了 [isInView](https://github.com/kamranahmedse/driver.js/blob/0b31fb753d01cdebff5c9b4feb8c466586b387d0/src/core/element.js#L49) 函数判断当前高亮区域是否在可视区域。

**重点就是 isInView 函数，通过计算高亮节点的位置与当前 window 对象包含区域和滚动偏移量对比判断当前节点是否在可视区域**，若在则进行下一步，若不在则通过 [bringInView](https://github.com/kamranahmedse/driver.js/blob/0b31fb753d01cdebff5c9b4feb8c466586b387d0/src/core/element.js#L87) 函数进行调整，**这一步其实就会存在问题**。比如例2中，虽然 middle 确实是在 window 的可视区域内，但实际上因为 middle 父级的可视区域高度只有 250px，导致 middle 无法正确展示。正确逻辑应该是通过 middle 父级对比判断 middle 是否在可视区域内。同样的问题在 [github issue](https://github.com/kamranahmedse/driver.js/issues/232) 中也提到了。

![4d48a5010f72fbe2d09d06e3150fe8a2.png](en-resource://database/1176:1)

![c5b632aaa8a449490b3f37c59d1a2855.png](en-resource://database/1180:1)

![1bd2b8b977fa25dbdaffe9b0aacf8d19.png](en-resource://database/1182:1)


showPopver、showStage 两个方法中都调用了
[getCalculatedPosition](https://github.com/kamranahmedse/driver.js/blob/0b31fb753d01cdebff5c9b4feb8c466586b387d0/src/core/element.js#L116) 方法，该方法通过 window/document/body 对象计算位置信息，可能也会导致页面展示与预期效果不一致问题，具体解决措施还需要针对场景去实施。

![820323b032679bcbed19e61ed61abc0e.png](en-resource://database/1184:1)


[掘金文章链接](https://juejin.cn/post/7097985847605067813)











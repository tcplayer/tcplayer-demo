// 导入依赖
import { i18n } from '@tencent/tea-app';
// 导入词条
import { zh, en } from '../i18n/translation';
/* eslint-disable no-undef */
window["LANGUAGE"] = LANGUAGE;
// 初始化国际化词条
/* eslint-disable no-undef */
if (LANGUAGE === 'en') {
  i18n.init({ translation: en });
} else {
  i18n.init({ translation: zh });
}


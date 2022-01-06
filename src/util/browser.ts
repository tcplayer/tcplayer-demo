const tbsReg = /tbs\/(\d+) /i;
const firefoxReg = /firefox\/(\d+)\./i;
const safariReg = /safari\/(\d+)\./i;
const chromeReg = /chrome\/(\d+)\./i;
const ucReg = /UCBrowser\/(\d+)\./i;

const iOSReg = /iPhone|iPad|iOS/i;
const iOSVersionReg = /OS (\d+)_(\d+)_?(\d+)?/;
/**
 * 检测是否是x5内核
 */
const isTbs = tbsReg.test(navigator.userAgent);

/**
 * 检测是否是firefox
 */
const isFirefox = firefoxReg.test(navigator.userAgent);
export const IS_FIREFOX = isFirefox;

/**
 * 检测是否是uc浏览器
 */
const isUCBrowser = ucReg.test(navigator.userAgent);
/**
 * 检测是否是safari
 */
const isSafari = safariReg.test(navigator.userAgent) && !chromeReg.test(navigator.userAgent);

/**
 * 检测是否是iOS
 */
const isIOS = iOSReg.test(navigator.userAgent);
export const IS_IOS = isIOS;

/**
 * 获取iOS版本
 */
export const getIOSVersion = () => {
  const match = navigator.userAgent.match(iOSVersionReg);
  return (match && [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3] || '0', 10)]) || [];
};

export const IS_ANDROID = (/Android/i).test(navigator.userAgent);

export const IS_MOBILE = IS_IOS || IS_ANDROID;

/**
 * Extract browser version out of the provided user agent string.
 *
 * @param uastring userAgent string.
 * @param expr Regular expression used as match criteria.
 * @param pos position in the version string to be returned.
 * @return browser version.
 */
const extractVersion = (uastring: string, expr: string | RegExp, pos: number) => {
  const match = uastring.match(expr);
  return match && match.length >= pos && parseInt(match[pos], 10);
};

/**
 * 检测是否支持h264
 */
const checkH264Support = async () => {
  try {
    const configuration: any = {
      iceServers: [], // windows PC微信内置浏览器，不加这个参数，创建RTCPeerConnection会报错
      sdpSemantics: 'unified-plan', // QQ浏览器，不加这个参数，无法使用addTransceiver方法，会报错
    };
    const peerConnection = new RTCPeerConnection(configuration);
    let offerOptions = {};
    if (peerConnection.addTransceiver) {
      peerConnection.addTransceiver('audio', { direction: 'recvonly' });
      peerConnection.addTransceiver('video', { direction: 'recvonly' });
    } else {
      offerOptions = { offerToReceiveVideo: true, offerToReceiveAudio: true };
    }
    const offer = await peerConnection.createOffer(offerOptions);
    const isSupported = (offer as any).sdp.toLowerCase().indexOf('h264') > -1;
    peerConnection.close();
    return isSupported;
  } catch (e) {
    return false;
  }
};

/**
 * 检测浏览器是否支持webrtc
 */
export const checkSupport = async () => {
  let isWebRTCSupported = false;
  ['RTCPeerConnection', 'webkitRTCPeerConnection'].forEach((item) => {
    if (isWebRTCSupported) {
      return;
    }
    if (item in window) {
      isWebRTCSupported = true;
    }
  });
  if (!isTbs) {
    if (isUCBrowser && isIOS) {
      // android的uc浏览器直接就不支持webrtc，ios的uc浏览器会劫持video标签，导致无法播放视频流
      isWebRTCSupported = false;
    } else if (isSafari && isIOS) {
      const iOSVersion = getIOSVersion();
      // iOS 11.1.2 以下版本不支持
      if (
        iOSVersion.length === 0 ||
        iOSVersion[0] < 11 ||
        (iOSVersion[0] === 11 && iOSVersion[1] < 1) ||
        (iOSVersion[0] === 11 && iOSVersion[1] === 1 && iOSVersion[2] < 2)
      ) {
        isWebRTCSupported = false;
      }
    }
  }

  const isH264Supported = await checkH264Support();

  const ret = {
    support: isWebRTCSupported,
    isTbs,
    tbsVersion: isTbs ? extractVersion(navigator.userAgent, tbsReg, 1) : null,
    isFirefox,
    isSafari,
    isIOS,
    iOSVersion: isIOS ? getIOSVersion().join('.') : null,
    h264Support: isH264Supported,
  };
  return ret;
};

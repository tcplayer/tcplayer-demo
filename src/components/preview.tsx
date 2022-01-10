import React, { useEffect, useState } from "react";
import { Form, Checkbox, Input, Button, Icon, Text, Bubble, Badge } from "@tencent/tea-component";
import QRCode from 'qrcode';
import { getUrlParameter } from '../util';
import { checkSupport, IS_MOBILE, IS_IOS } from '../util/browser';

function Preview({type = 'webrtc', activeId}) {
  const [url, setUrl] = useState<string>();
  const [url_sd, setUrlSd] = useState<string>();
  const [url_hd, setUrlHd] = useState<string>();
  const [clarity, setClarity] = useState<string[]>([]);
  const [tcplayer, setTcplayer] = useState<any>();
  const [stat, setStat] = useState<any>();
  const [showStat, setShowStat] = useState(false);
  const [webrtcSupport, setWebrtcSupport] = useState<boolean>();
  const [h264Support, setH264Support] = useState<boolean>();


  useEffect(() => {
    const url = getUrlParameter('url');
    const url_sd = getUrlParameter('url_sd');
    const url_hd = getUrlParameter('url_hd');
    const urlType = getUrlParameter('type');
  
    if (urlType === type) {

      setUrl(url);
      setUrlSd(url_sd);
      setUrlHd(url_hd);

      if ((url && url_sd) || (url && url_hd) || (url_sd || url_hd)) {
        setClarity(['clarity']);
      }
  
    }

    if ((!url && !url_sd && !url_hd && type === 'webrtc') || (urlType === 'flv' && IS_IOS)) {
      setUrl('webrtc://5664.liveplay.myqcloud.com/live/5664_harchar1?txSecret=f22a813b284137ed10d3259a7b5c224b&txTime=6403f7bb');
    }

    const support = async () => {
      if (type === 'webrtc') {
        const support = await checkSupport();
        setWebrtcSupport(!!support.support);
        setH264Support(!!support.h264Support);
      }
    }

    support();
  
  }, []);


  // 父组件切换tab时，暂停当前页面
  useEffect(() => {
    if (type !== activeId && tcplayer && tcplayer.playing()) {
      tcplayer.pause();
    }
  }, [activeId]);


  const preview = () => {
    if (tcplayer) {
      tcplayer?.destroy();
    }; 

    let sourceList = {
      [`${type === 'hls' ? 'm3u8' : type}`]: url,
      [`${type === 'hls' ? 'm3u8' : type}_hd`]: url_hd,
      [`${type === 'hls' ? 'm3u8' : type}_sd`]: url_sd,
    };

    const params = { ...{
      autoplay: true,
      live: true,
      h5_flv: true,
      listener: (msg) => {
        if (msg.type === 'webrtcstatupdate') {
          onPlayStats(msg.detail);
        }
      }
    }, ...sourceList };

    console.log('params', params);

    setTcplayer(new (window as any).TcPlayer(`tcplayer_container_${type}`, params));
  }

  const generateQRCode = async (visible) => {
    if (visible) {
      const fullAddress = `${window.location.origin}${window.location.pathname}?url=${url ? encodeURIComponent(url) : ''}&url_sd=${url_sd ? encodeURIComponent(url_sd) : ''}&url_hd=${url_hd ? encodeURIComponent(url_hd) : ''}&type=${type}`;
      console.log('fullAddress', fullAddress);

      setTimeout(() => {
        QRCode.toCanvas(document.getElementById('canvas'), fullAddress, function (error) {
          if (error) console.error(error);
        })
      }, 10);
    }
  }

  const onPlayStats = (data) => {
    const statOfVideo = [] as any;
    const statOfAudio = [] as any;
    for(const key in data.video) {
      let value = data.video[key];
      value = value === undefined ? '' : value;
      if (value) {
        if (key === 'bitrate') {
          value = (value / 1024).toFixed(2) + ' Kbit/s';
        }
        if (key === 'jitterBufferDelay' || key === 'frameDecodeAvgTime') {
          value = value + ' ms';
        }
        if (key === 'codec') {
          value = value.replace(/\(.*\)/, '');
        }
      }
      statOfVideo.push({
        key, value,
      });
    }

    if (data.audio) {
      for(let key in data.audio) {
        let value = data.audio[key];
        value = value === undefined ? '' : value;
        if (value) {
          if (key === 'bitrate') {
            value = (value / 1024).toFixed(2) + ' Kbit/s';
          }
          if (key === 'jitterBufferDelay') {
            value = value + ' ms';
          }
          if (key === 'codec') {
            value = value.replace(/\(.*\)/, '');
          }
        }
        statOfAudio.push({
          key, value,
        });
      }
    }

    setStat({
      video: statOfVideo,
      audio: statOfAudio,
    });
  }

  return (
    <div className="webrtc-container">
      {
        type === 'webrtc' ? (
          <>
            <section className="webrtc-support">
              <Badge theme={webrtcSupport ? 'success' : 'warning'}>WebRTC { webrtcSupport ? '' : 'Not' } Support</Badge>
              <Badge theme={h264Support ? 'success' : 'warning'}>H264 { h264Support ? '' : 'Not' } Support</Badge>
            </section>
          </>
        ) : null
      }
      {
        clarity.length === 0 ? (
          <Input
            className="webrtc-input"
            value={url}
            onChange={(value, context) => {
              setUrl(value);
            }}
            placeholder="请输入播放地址"
            onPressEnter={console.log}
          />
        ) : (
          <Form>
      
            <Form.Item label="超清">
              <Input
                className="webrtc-input"
                value={url}
                onChange={(value, context) => {
                  setUrl(value);
                }}
                placeholder="请输入播放地址"
                onPressEnter={console.log}
              />
            </Form.Item>

            <Form.Item label="高清">
              <Input
                className="webrtc-input"
                value={url_hd}
                onChange={(value, context) => {
                  setUrlHd(value);
                }}
                placeholder="请输入播放地址"
                onPressEnter={console.log}
              />
            </Form.Item>

            <Form.Item label="标清">
              <Input
                className="webrtc-input"
                value={url_sd}
                onChange={(value, context) => {
                  setUrlSd(value);
                }}
                placeholder="请输入播放地址"
                onPressEnter={console.log}
              />
            </Form.Item>
          </Form>
        )
      }
      


      <section className="clarity-switcher">
        <Checkbox.Group value={clarity} onChange={value => setClarity(value)}>
          <Checkbox name="clarity">多分辨率切换</Checkbox>
        </Checkbox.Group>
        <div>
          {
            type !== 'webrtc' ?  <a href="https://cloud.tencent.com/document/product/266/36451" target="_blank" rel="noreferrer">如何获取点播地址？</a> : null
          }
          {
            type !== 'mp4' ? <a href="https://cloud.tencent.com/document/product/267/32720" target="_blank" rel="noreferrer">如何获取直播地址？</a> : null
          }
        </div>
      </section>

      <section className="preview-btn">
        <Button onClick={preview} type="primary" className={IS_MOBILE ? 'btn-mobile-preview' : ''}>{
          !IS_MOBILE ? 'PC 端播放器预览' : '预览'
        }</Button>

        {
          !IS_MOBILE ? (
            <Bubble trigger="click" onVisibleChange={generateQRCode} placement="bottom" content={<>
              <canvas id="canvas"></canvas>
              {
                type === 'flv' ? (<Text className="qr-tips">不支持iOS端播放</Text>) : null
              }
            </>}>
              <Button type="primary">移动端播放器预览</Button>
            </Bubble>
          ) : null
        }

      </section>

      <section className="tcplayer-wrapper">
        <div id={`tcplayer_container_${type}`} className="tcplayer-container"></div>
        {
          stat && showStat ? (
            <div className="statistics-panel">
              <ul className="stat-wrapper">
                <li style={{ margin: '5px 0 5px 0' }}>
                  <Text>Video</Text>
                  <Icon onClick={() => setShowStat(false)} type="close" />
                </li>
                {
                  stat?.video?.map(item => {
                    return (
                      <li>
                        <Text>{item.key}</Text>
                        <Text>{item.value}</Text>
                      </li>
                    )
                  })
                }
                <li style={{ margin: '5px 0 5px 0' }}>
                  <Text>Audio</Text>
                </li>
                {
                  stat?.audio?.map(item => {
                    return (
                      <li>
                        <Text>{item.key}</Text>
                        <Text>{item.value}</Text>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          ) : null
        }
        
      </section>
      
      {
        tcplayer ? (
          <section className="manipulate-btns">
            <Button onClick={() => tcplayer?.play()} type="primary">开始/恢复</Button>
            <Button onClick={() => tcplayer?.pause()}>暂停</Button>
            <Button onClick={() => tcplayer?.stop()}>停止</Button>
            <Button onClick={() => {
              tcplayer?.destroy();
              setTcplayer(null);
            }}>销毁</Button>
            <Button onClick={() => tcplayer?.mute(true)}>静音</Button>
            <Button onClick={() => tcplayer?.mute(false)}>取消静音</Button>
            <Button onClick={() => tcplayer?.fullscreen(true)}>全屏</Button>
            {
              type === 'webrtc' ? <Button onClick={() => setShowStat(true)}>统计数据</Button> : null
            }
          </section>
        ) : null
      }

    </div>
  )
}

export default Preview;
import React, { useEffect, useState } from "react";
import { Form, Checkbox, Input, Button, Icon, Text, Bubble, H3, Tabs, TabPanel, Badge, Justify } from "@tencent/tea-component";
import { checkSupport, IS_MOBILE, IS_IOS } from '../util/browser';
import { t, Trans } from '@tencent/tea-app/lib/i18n';
import { getUrlParameter } from '../util';



const playTabs = [
  { id: "url", label: t("URL播放") },
  { id: "fileid", label: t("FileID播放") },
];

const sources = {
  zh: {
    url: 'https://1500005692.vod2.myqcloud.com/43843706vodtranscq1500005692/62656d94387702300542496289/v.f100240.m3u8',
    fileID: '387702299186115471',
    appID: '1500005692',
  },
  en: {
    url: 'https://1500009007.vod2.myqcloud.com/43864de0vodtranscq1500009007/2fb02795387702305297108918/v.f100280.m3u8',
    fileID: '387702305297108918',
    appID: '1500009007',
  }
}


function PlayPanel (props) {
  const [type, setType] = useState(getUrlParameter('playmode') || 'url');
  const [url, setUrl] = useState<string>(getUrlParameter('url') || sources[window['LANGUAGE']].url);
  const [webrtcSupport, setWebrtcSupport] = useState<boolean>();
  const [h264Support, setH264Support] = useState<boolean>();


  const [fileID, setFileID] = useState<string>(getUrlParameter('fileid') || sources[window['LANGUAGE']].fileID);
  const [appID, setAppID] = useState<string>(getUrlParameter('appid') || sources[window['LANGUAGE']].appID);
  const [psign, setPsign] = useState<string>(getUrlParameter('psign') || '');

  useEffect(() => {
    const support = async () => {
      const support = await checkSupport();
      setWebrtcSupport(!!support.support);
      setH264Support(!!support.h264Support);
    }

    support();
    preview();
  }, []);

  useEffect(() => {
    preview();
  }, [type]);


  const preview = () => {
    if (type === 'fileid') {
      if (!fileID || !appID) return false;
    } else {
      if (!url) return false;
    }
    props.onPreview && props.onPreview({
      url,
      type,
      fileID,
      appID,
      psign,
    });    
  }

  const reset = () => {
    if (type === 'fileid') {
      setFileID('');
      setAppID('');
      setPsign('');
    } else {
      setUrl('');
    }
  }

  return <div style={{ padding: '20px' }}>
    <Tabs tabs={playTabs} onActive={(tab) => setType(tab.id)} >
      {playTabs.map(tab => (
        <TabPanel id={tab.id} key={tab.id}>
          {
            type === 'fileid' ? <>
              <Text reset>fileID:</Text>
              <Input
                size='full'
                style={{ margin: '5px 0 10px 0' }}
                value={fileID}
                onChange={(value, context) => {
                  setFileID(value);
                }}
                placeholder={t("输入fileID")}
              />
              <br />
              <Text reset>appID:</Text>
              <Input
                size='full'
                style={{ margin: '5px 0 10px 0' }}
                value={appID}
                onChange={(value, context) => {
                  setAppID(value);
                }}
                placeholder={t("输入appID")}
              />
              <br />
              <Text reset>psign:</Text>
              <Input
                size='full'
                style={{ margin: '5px 0 10px 0' }}
                value={psign}
                onChange={(value, context) => {
                  setPsign(value);
                }}
                placeholder={t("输入psign")}
              />
            
            </> : <>
              <Justify left={
                <H3>{t('播放地址')}</H3>
              } right={
                <div className="webrtc-support">
                  <Bubble
                    arrowPointAtCenter
                    placement="top-end"
                    content={webrtcSupport ? t('当前浏览器支持 WebRTC 协议') : t('当前浏览器不支持 WebRTC 协议')}
                  >
                    <Badge theme={webrtcSupport ? 'success' : 'warning'}>WebRTC { webrtcSupport ? '' : 'Not' } Support</Badge>
                  </Bubble>
                  <Bubble
                    arrowPointAtCenter
                    placement="top-end"
                    content={h264Support ? t('当前浏览器支持 H264 编码') : t('当前浏览器不支持 H264 编码')}
                  >
                    <Badge theme={h264Support ? 'success' : 'warning'}>H264 { h264Support ? '' : 'Not' } Support</Badge>
                  </Bubble>
                  
                </div>
              } />
              
              <Input
                style={{ margin: '5px 0 10px 0' }}
                size='full'
                value={url}
                onChange={(value, context) => {
                  setUrl(value);
                }}
                placeholder={t("输入视频地址")}
              />
              <div>
                <Text theme="label" reset>{t('支持WebRTC、FLV、HLS的直播流地址，以及HLS、FLV、MP4等格式的点播播放地址')}</Text>
              </div>
              <>
              
                <Button type="link" style={{ margin: '10px 10px 0 0' }}><a target="_blank" rel="noreferrer" href={(window as any).lang === "en" ? "https://www.tencentcloud.com/document/product/267/38393" : "https://cloud.tencent.com/document/product/267/32720"}>{t('如何获取云直播的直播流地址')}</a></Button>
                <Button type="link" style={{ margin: '10px 10px 0 0' }}><a target="_blank" rel="noreferrer" href={(window as any).lang === "en" ? "https://www.tencentcloud.com/document/product/266/33895" : "https://cloud.tencent.com/document/product/266/36451"}>{t('如何获取云点播的视频地址')}</a></Button>
              </>
              
            </>
          }

        </TabPanel>
      ))}
    </Tabs>

    <section style={{ position: 'absolute', bottom: '20px' }}>
      <Button type="primary" onClick={preview} style={{ marginRight: '20px'}}>
        {t('预览')}
      </Button>
      <Button onClick={reset}>
        {t('重置')}
      </Button>
    </section>
  </div>
}

export default PlayPanel;
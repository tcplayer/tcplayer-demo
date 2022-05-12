import React, { useEffect, useState } from "react";
import { Form, Checkbox, Input, Button, Icon, Text, Bubble, H3, Tabs, TabPanel, Badge, Justify } from "@tencent/tea-component";
import { checkSupport, IS_MOBILE, IS_IOS } from '../util/browser';

const playTabs = [
  { id: "url", label: "URL播放" },
  { id: "fileid", label: "FileID播放" },
];

function PlayPanel (props) {
  const [type, setType] = useState('url');
  const [url, setUrl] = useState<string>('https://1500005692.vod2.myqcloud.com/43843706vodtranscq1500005692/62656d94387702300542496289/v.f100240.m3u8');
  const [webrtcSupport, setWebrtcSupport] = useState<boolean>();
  const [h264Support, setH264Support] = useState<boolean>();


  const [fileID, setFileID] = useState<string>('387702299186115471');
  const [appID, setAppID] = useState<string>('1500005692');
  const [psign, setPsign] = useState<string>();

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
                placeholder="输入fileID"
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
                placeholder="输入appID"
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
                placeholder="输入psign"
              />
            
            </> : <>
              <Justify left={
                <H3>播放地址</H3>
              } right={
                <div className="webrtc-support">
                  <Bubble
                    arrowPointAtCenter
                    placement="top-end"
                    content={`当前浏览器${webrtcSupport ? '' : '不'}支持 WebRTC 协议`}
                  >
                    <Badge theme={webrtcSupport ? 'success' : 'warning'}>WebRTC { webrtcSupport ? '' : 'Not' } Support</Badge>
                  </Bubble>
                  <Bubble
                    arrowPointAtCenter
                    placement="top-end"
                    content={`当前浏览器${h264Support ? '' : '不'}支持 H264 编码`}
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
                placeholder="输入视频地址"
              />
              <Text theme="label" reset>支持WebRTC、FLV、HLS的直播流地址，以及HLS、FLV、MP4等格式的点播播放地址</Text>
              <>
                <Button type="link" style={{ margin: '10px 10px 0 0' }}><a target="_blank" rel="noreferrer" href="https://cloud.tencent.com/document/product/267/32720
  ">如何获取云直播的直播流地址</a></Button>
                <Button type="link" style={{ margin: '10px 10px 0 0' }}><a target="_blank" rel="noreferrer" href="https://cloud.tencent.com/document/product/266/36451">如何获取云点播的视频地址</a></Button>
              </>
              
            </>
          }

        </TabPanel>
      ))}
    </Tabs>

    <section style={{ position: 'absolute', bottom: '20px' }}>
      <Button type="primary" onClick={preview} style={{ marginRight: '20px'}}>
        预览
      </Button>
      <Button onClick={reset}>
        重置
      </Button>
    </section>
  </div>
}

export default PlayPanel;
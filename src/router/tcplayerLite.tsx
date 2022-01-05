import "@tencent/tea-component/dist/tea.css";
import "../App.css";
import React, { useState, useEffect } from "react";
import { Layout, NavMenu, Tabs, TabPanel, Text } from "@tencent/tea-component";
import Preview from '../components/preview';
import { getUrlParameter } from '../util';

const { Header, Body, Content } = Layout;

function TcplayerLite() {
  const [activeId, setActiveId] = useState<string>();
  const tabs = [
    { id: "webrtc", label: "WebRTC" },
    { id: "hls", label: "HLS" },
    { id: "flv", label: "FLV" },
    { id: "mp4", label: "MP4" },
  ];

  useEffect(() => {
    const type = getUrlParameter('type') || 'webrtc';
    setActiveId(type);
  }, []);

  return (
    <Layout className="tcplayerlite" style={{ minHeight: '100vh' }}>
      <Header>
        <NavMenu
          left={
            <>
              <NavMenu.Item type="logo">
                <img className="tcplayerlite-logo" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/picture/icon-vcube.png" alt="" />
              </NavMenu.Item>
            </>
          }
        />
      </Header>
      <Body>
        <section className="top-area">
          <Text className="top-title">TCPlayer Lite</Text>
          <Text className="sub-title">腾讯云 ‧ 音视频终端引擎</Text>
          <br />
          <a href="https://cloud.tencent.com/document/product/1449/57070" target="_blank" rel="noreferrer">查看集成指引 {'>>'}</a>
        </section>
        
        <Content>
          <Content.Body>
          <section>
            <Tabs className="format-tabs" destroyInactiveTabPanel={false} activeId={activeId} onActive={(type) => setActiveId(type.id)} tabs={tabs}>
              <TabPanel id="webrtc">
                <Preview type="webrtc" activeId={activeId}/>
              </TabPanel>
              <TabPanel id="hls">
                <Preview type="hls" activeId={activeId}/>
              </TabPanel>
              <TabPanel id="flv">
                <Preview type="flv" activeId={activeId}/>
              </TabPanel>
              <TabPanel id="mp4">
                <Preview type="mp4" activeId={activeId}/>
              </TabPanel>
            </Tabs>
          </section>                 
          </Content.Body>
        </Content>
      </Body>
    </Layout>
  );
}
export default TcplayerLite;

import "@tencent/tea-component/dist/tea.css";
import "./App.css";
import React, { useState, useEffect} from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import {
  Layout,
  NavMenu,
  Form,
  Segment,
  Card,
  Copy,
  MonacoEditor,
  Text,
  Button,
} from "@tencent/tea-component";

import { source } from './demo/index.js';
import { docs } from './docs';

const { Header, Body, Content } = Layout;

function clearIframe(id){
  var el = document.getElementById(id),
  iframe = el.contentWindow;
  if(el) {
    // eslint-disable-next-line no-script-url
    el.src = 'javascript:void(0)';
  try {
    iframe.document.write('');  
    iframe.document.clear();
  } catch(e){

  };
}} 

function App() {
  const [value, setValue] = useState('vttThumbnail');
  const [code, setCode] = useState(source[value] || '');

  useEffect(() => {
    setCode(source[value]);
  }, [value]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <NavMenu
          left={
            <>
              <NavMenu.Item type="logo">
                <div className="clg-logo"></div>
              </NavMenu.Item>
            </>
          }
        />
      </Header>
      <Body>
        <section className="top-area">
          <Text className="top-title">Web端超级播放器体验</Text>
          <div className="top-btns">
            <Button type="primary">
              <a href="https://cloud.tencent.com/document/product/1449/57088" target="_blank" rel="noreferrer">立即使用</a>
            </Button>
            <Button>
              <a href="https://cloud.tencent.com/product/player" target="_blank" rel="noreferrer">播放器SDK</a>
            </Button>
          </div>
          <Card className="card card-notice">
            <img src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/picture/icon-notice.png" alt=""/>
            <Text>
              为了获取更好的产品功能及播放性能体验，建议结合腾讯 
              <a href="https://cloud.tencent.com/document/product/266/45543" target="_blank" rel="noreferrer">云点播</a>
              和
              <a href="https://cloud.tencent.com/product/css" target="_blank" rel="noreferrer">云直播</a>
              使用。
            </Text>
          </Card>
        </section>
        
        <Content>
          <Content.Body>
            <Card className="card card-player-function">
              <Form>
                <Form.Item label="播放器功能">
                  <Segment
                    value={value.toString()}
                    onChange={value => {
                      if (value === 'more') {
                        return false;
                      }
                      clearIframe('previewIframe');
                      setValue(value)
                    }}
                    options={[
                      { text: "缩略图预览-云端生成文件", value: "vttThumbnail" },
                      { text: "缩略图预览-手动传入文件", value: "vttThumbnailSrc"},
                      { text: "进度条标记", value: "progressMarker" },
                      { text: "自适应码流", value: "qualityApi" },
                      { text: "DASH 播放", value: "dash" },
                      { text: "清晰度切换提示", value: "levelSwitchTips" },
                      { text: "Key 防盗链", value: "key" },
                      { text: "播放器尺寸", value: "sizeAdaptive" },
                      { text: "事件回调", value: "event" },
                      { text: "字幕", value: "subtitles" },
                      { text: "断点续播", value: "continuePlay" },
                      { text: "视频切换", value: "changeFile" },
                      { text: "试看功能", value: "trial" },
                      { text: "视频镜像", value: "mirror" },
                      { text: "动态水印", value: "dynamicWatermark" },
                      { text: "提示文案", value: "customError" },
                      { text: "贴片广告", value: "poster" },
                      { text: "统计信息", value: "fileStatistic" },
                      { text: "倍速播放", value: "playbackRate" },
                      { text: "多语言", value: "language" },
                      { text: "多实例", value: "multi" },

                      { text: (
                        <>
                          <a href="https://github.com/tcplayer/tcplayer-demo/tree/main/src/demo" target="_blank" rel="noreferrer">更多</a>
                        </>
                      ), value: "more" },
                      // { text: "HLS 自适应码流播放", value: "hlsMasterplaylist" },
                      // { text: "Referer 防盗链", value: "levelSwitchTips" },
                      // { text: "HLS 加密播放", value: "levelSwitchTips" },
                      // { text: "弹幕", value: "subtitles" },                      
                    ]}
                  />
                </Form.Item>
              </Form>
            </Card>

            <Card className="card card-preview">
              <Form>
                <Form.Item label=" ">
                  <div className="iframe-wrapper">
                    <Card>
                      <iframe
                        id="previewIframe"
                        title="previewIframe"
                        srcdoc={code}
                        frameBorder="0"
                        width="100%"
                        height="360px"
                        allowFullScreen={true}
                      ></iframe>
                    </Card>
                    <section className="tea-code">
                      <Copy text={code}/>
                      <MonacoEditor
                        className="tea-code-pre"
                        monaco={monaco}
                        height={360}
                        value={code}
                        language="javascript"
                        onChange={val => setCode(val)}
                        defaultValue={code}
                      />
                    </section>
                  </div>
                </Form.Item>
                {
                  docs[value] ?
                  <Form.Item label=" " >
                    <Card>
                      <Card.Body>
                        <div>{docs[value]}</div>
                        {/* <div dangerouslySetInnerHTML={{__html: marked(docs[value])}} /> */}
                      </Card.Body>
                    </Card>                
                  </Form.Item>
                  : null
                }
                
              </Form>
            </Card>        
          </Content.Body>
        </Content>
      </Body>
    </Layout>
  );
}
export default App;

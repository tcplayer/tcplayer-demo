import "@tencent/tea-component/dist/tea.css";
import "./App.css";
import React, { useState, useEffect} from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import {
  Layout,
  NavMenu,
  Form,
  RadioGroup,
  Radio,
  Segment,
  Card,
  Copy,
  MonacoEditor,
} from "@tencent/tea-component";
import { source } from './demo/index.js';
import { docs } from './docs';

const { Header, Body, Content } = Layout;


function clearIframe(id){
  var el = document.getElementById(id),
  iframe = el.contentWindow;
  if(el){
    el.src = 'javascript:void(0)';
  try{
    iframe.document.write('');  
    iframe.document.clear();
  }catch(e){};
  // document.body.removeChild(el);
}} 

function App() {
  const [playerType, setPlayerType] = useState('tcplayer');
  const [value, setValue] = useState('continuePlay');
  const [code, setCode] = useState(source[value] || '');
  const previewCode = `${'javascript: ' + '\''}${code}'`;

  useEffect(() => {
    setCode(source[value]);
    console.log('docs[value]', docs[value]);
  }, [value]);

  return (
    <Layout>
      <Header>
        <NavMenu
          left={
            <>
              <NavMenu.Item type="logo">
                <div className="clg-logo"></div>
              </NavMenu.Item>
              <div className="tab-demo">
                <span>功能展示</span>
                <span className="underline"></span>
              </div>
              {/* <div className="tab-doc">
                <a href="" target="_blank">帮助文档</a>
              </div> */}
            </>
          }
        />
      </Header>
      <Body>
        <Content>
          <Content.Body>
            <Form>
              <Form.Item label="播放器类型">
                <RadioGroup value={playerType} onChange={setPlayerType}>
                  <Radio name="tcplayer">超级播放器</Radio>
                  {/* <Radio name="tcplayerlite">TCPlayer Lite</Radio> */}
                </RadioGroup>
              </Form.Item>
              <Form.Item label="播放器功能">
                <Segment
                  value={value.toString()}
                  onChange={value => {
                    clearIframe('previewIframe');
                    setValue(value)
                  }}
                  options={[
                    { text: "续播", value: "continuePlay" },
                    { text: "CSS设置尺寸", value: "sizeAdaptive" },
                    { text: "缩略图预览-服务端生成", value: "vttThumbnail" },
                    { text: "缩略图预览-传入缩略图与VTT文件", value: "vttThumbnailSrc" },
                    { text: "切换文件播放", value: "changeFile" },
                    { text: "镜像", value: "mirror" },
                    { text: "进度条标记", value: "progressMarker" },
                    { text: "HLS 自适应码流播放", value: "qualityApi" },
                    // { text: "HLS 自适应码流播放", value: "hlsMasterplaylist" },
                    { text: "清晰度切换提示", value: "levelSwitchTips" },
                    // { text: "Referer 防盗链", value: "levelSwitchTips" },
                    { text: "Key 防盗链", value: "key" },
                    { text: "试看功能", value: "trial" },
                    // { text: "HLS 加密播放", value: "levelSwitchTips" },
                    { text: "DASH 播放", value: "dash" },
                    { text: "统计信息", value: "fileStatistic" },
                    { text: "自定义提示文案", value: "customError" },
                    { text: "多语言", value: "language" },
                    { text: "多实例", value: "multi" },
                    { text: "字幕", value: "subtitles" },
                    // { text: "弹幕", value: "subtitles" },
                    { text: "事件回调", value: "event" },
                    { text: "动态水印", value: "dynamicWatermark" },
                  ]}
                />
              </Form.Item>

              <Form.Item label=" ">
                <div className="iframe-wrapper">
                  <Card>
                    <iframe
                      id="previewIframe"
                      title="previewIframe"
                      src={previewCode}
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
                      language="html"
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
          </Content.Body>

        </Content>
      </Body>
    </Layout>
  );
}
export default App;

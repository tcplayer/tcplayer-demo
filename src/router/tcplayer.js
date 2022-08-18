import "@tencent/tea-component/dist/tea.css";
import "../App.css";
import React, { useState, useEffect} from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import PlayPanel from "../components/playPanel";
import { t, Trans } from '@tencent/tea-app/lib/i18n';
import { getUrlParameter } from '../util';


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

import { source } from '../demo/index.js';
import { docs } from '../docs';

console.log('Trans', Trans);

const { Header, Body, Content } = Layout;

function clearIframe(id){
  var el = document.getElementById(id),
  iframe = el && el.contentWindow;
  if(el) {
    // eslint-disable-next-line no-script-url
    el.src = 'javascript:void(0)';
  try {
    iframe.document.write('');  
    iframe.document.clear();
  } catch(e){

  };
}} 


const modifyLanguage = (string) => {
  if (window.lang === 'en') {
    string = string.replace(`var player = TCPlayer("player-container-id", {`, `
  var player = TCPlayer("player-container-id", {
    language: "en",`);
  }

  return string;
}

function App() {
  const [value, setValue] = useState('play');
  const [code, setCode] = useState(source[value] || '');
  const type = getUrlParameter('type') || 'play';
  

  const onPreview = ({ url, type, fileID, appID, psign }) => {
    const sourcecode = source[`play${type}`];
    if (type === 'url') {
      setCode(modifyLanguage(sourcecode.replace('foo_url', url)));
    }

    if (type === 'fileid') {
      let sourcecodeNew = sourcecode.replace('foo_fileID', fileID).replace('foo_appID', appID).replace('psign', (psign || ''));
      setCode(modifyLanguage(sourcecodeNew));
    }
  }

  // 
  useEffect(() => {
    setValue(type);


  }, []);


  useEffect(() => {
    if (value !== 'play') {
      setCode(modifyLanguage(source[value]));
    } else {
      // TODO:
    }
    
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
          <Text className="top-title">{t('Web端超级播放器体验')}</Text>
          <div className="top-btns">

            {
              window.lang === 'zh' ?
              <Button type="primary" className="primary-btn">
                <a href="https://cloud.tencent.com/document/product/1449/57088" target="_blank" rel="noreferrer">{t('立即使用')}</a>
              </Button>
              : null
            }

            <Button className="secondary-btn">
              <a href={window.lang === "en" ? "https://www.tencentcloud.com/document/product/266/33977" : "https://cloud.tencent.com/product/player"} target="_blank" rel="noreferrer">{t('产品文档')}</a>
            </Button>
            

          </div>
          <Card className="card card-notice">
            <img src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/picture/icon-notice.png" alt=""/>
            <Text>
              <Trans>
              为了获取更好的产品功能及播放性能体验，建议结合腾讯 
              <a href={window.lang === "en" ? "https://www.tencentcloud.com/document/product/266/7836" : "https://cloud.tencent.com/document/product/266/45543" } target="_blank" rel="noreferrer">云点播</a>
              和
              <a href={window.lang === "en" ? "https://www.tencentcloud.com/document/product/267" : "https://cloud.tencent.com/product/css" } target="_blank" rel="noreferrer">云直播</a>
              使用。
              </Trans>
            </Text>
          </Card>
        </section>
        
        <Content>
          <Content.Body>
            <Card className="card card-player-function">
              <Form>
                <Form.Item label={t("播放器功能")}>
                  <Segment
                    value={value.toString()}
                    onChange={value => {
                      if (value === 'more') {
                        window.open('https://github.com/tcplayer/tcplayer-demo/tree/main/src/demo');
                        return false;
                      }
                      clearIframe('previewIframe');
                      setValue(value)
                    }}
                    options={[
                      { text: t("视频播放"), value: "play" },
                      { text: t("缩略图预览-云端生成文件"), value: "vttThumbnail" },
                      { text: t("缩略图预览-手动传入文件"), value: "vttThumbnailSrc"},
                      { text: t("字幕"), value: "subtitles" },
                      { text: t("事件回调"), value: "event" },
                      { text: t("动态水印"), value: "dynamicWatermark" },
                      { text: t("贴片广告"), value: "poster" },
                      { text: t("进度条标记"), value: "progressMarker" },
                      { text: t("DASH 播放"), value: "dash" },
                      { text: t("Key 防盗链"), value: "key" },
                      { text: t("自适应码流"), value: "qualityApi" },
                      { text: t("清晰度切换提示"), value: "levelSwitchTips" },
                      { text: t("断点续播"), value: "continuePlay" },
                      { text: t("视频轮播"), value: "playlist" },
                      { text: t("视频切换"), value: "changeFile" },
                      { text: t("试看功能"), value: "trial" },
                      { text: t("视频镜像"), value: "mirror" },
                      { text: t("提示文案"), value: "customError" },
                      { text: t("统计信息"), value: "fileStatistic" },
                      { text: t("播放器尺寸"), value: "sizeAdaptive" },
                      { text: t("自定义 UI"), value: "customUI", },
                      { text: t("倍速播放"), value: "playbackRate" },
                      { text: t("多语言"), value: "language" },
                      { text: t("多实例"), value: "multi" },
                      
                      { text: (
                        <>
                          <a href="" target="_blank" rel="noreferrer">{t('更多')}</a>
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
                        srcDoc={code}
                        frameBorder="0"
                        width="100%"
                        height="360px"
                        allowFullScreen={true}
                      ></iframe>
                    </Card>
                    <section className="tea-code">

                      {
                        value === 'play' ? <>
                          <PlayPanel onPreview={onPreview}></PlayPanel>
                        </> : <>
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
                        </>
                      }

                      
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

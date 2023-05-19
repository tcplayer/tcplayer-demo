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
  H3,
  H5,
  Icon,
  Justify,
} from "@tencent/tea-component";
import { source } from '../demo/index.js';
import { docs } from '../docs';
import IframeCommunication from '../libs/iframe';
import '../index.css';

// import TCPlayer from 'tcplayer.js';
// import 'tcplayer.js/dist/tcplayer.min.css';

const { Header, Body, Content } = Layout;
const flexStyle = {display: 'flex', justifyContent: 'space-around', alignItems: 'center'};
const labelStyle = { width: '16px', height: '16px', marginRight: '6px' };

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


// TODO: 国际站国内站分包之后，国际站默认启用英文，将不需要在此设置语言
const modifyLanguage = (string) => {
  if (window.lang === 'en') {
    string = string.replace(`var player = TCPlayer("player-container-id", {`, `
  var player = TCPlayer("player-container-id", {
    language: "en",`);
  }

  return string;
}

function App() {
  const [value, setValue] = useState('playurl');
  const [code, setCode] = useState(source[value] || '');
  const type = getUrlParameter('type') || 'playurl';
  const [communication, setCommunication] = useState();
  

  const onPreview = ({ url, type, fileID, appID, psign }) => {
    const sourcecode = source[`play${type}`];
    if (type === 'url') {

      console.log('代码：', sourcecode.replace('foo_url', url));
      setTimeout(() => {
        setCode(modifyLanguage(sourcecode.replace('foo_url', url)));
      }, 100);
    }

    if (type === 'fileid') {
      let sourcecodeNew = sourcecode.replace('foo_fileID', fileID).replace('foo_appID', appID).replace('foo_psign', (psign || ''));
      setTimeout(() => {
        setCode(modifyLanguage(sourcecodeNew));
      }, 100);
    }
  }

  const switchFunc = (value) => {
    clearIframe('previewIframe');
    setValue(value);

    switch(value) { 
      case 'playurl':
        communication.sendMessage('player-play-url', {});
        break;
      case 'playfileid':
        communication.sendMessage('player-play-fileID', {});
        break;
      case 'vttThumbnail':
        communication.sendMessage('player-thumbnail', {});
        break;
      case 'dynamicWatermark':
        communication.sendMessage('player-dynamic-watermark', {});
        break;
      case 'customUI':
        communication.sendMessage('player-custom-ui', {});
        break;
      case 'poster':
        communication.sendMessage('player-poster', {});
        break;
      case 'fileStatistic':
        communication.sendMessage('player-statistic', {});
        break;
      default:
    }
  };

  useEffect(() => {
    setValue(type);
  }, []);

  
  useEffect(() => {
    if (value !== 'play') {
      setCode(modifyLanguage(source[value]));
    }
  }, [value]);

  useEffect(() => {
    const communicationInstance = new IframeCommunication({
      isParent: false,
      from: 'player',
      to: 'experience-center',
      targetWindow: window.top
    });

    setCommunication(communicationInstance);

    communicationInstance.sendMessage('demoReady', {});
    communicationInstance.sendMessage('request-login', {});
    communicationInstance.sendMessage('player-play-url', {});
    // communication.on('experience-device', (data: {from: string; to: string; cmd: string; params: object}) => {
    // // 这里的 cmd 即 experience-device
    // });
  }, []);

  // useEffect(() => {
  //   var player = TCPlayer('player-container-id', {
  //     fileID: '243791576943072647',
  //     appID: '1306264703',
  //     psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMwNjI2NDcwMywiZmlsZUlkIjoiMjQzNzkxNTc2OTQzMDcyNjQ3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY3MDQ2OTk3MSwiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJQcm90ZWN0ZWRBZGFwdGl2ZSIsImRybUFkYXB0aXZlSW5mbyI6eyJwcml2YXRlRW5jcnlwdGlvbkRlZmluaXRpb24iOjEyfX0sInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTMwNjI2NDcwMy52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.FOcmChHfrGY9tYCDn20MSQi-IqvQ9U_U6qLNgx9MhLg',
  //   }); // player-container-id 为播放器容器 ID，必须与 html 中一致

  // }, [])

  const experienceMode = 'block';

  console.log('要渲染的code', code);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{display: experienceMode}}>
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
        <section className="top-area" style={{display: experienceMode}}>
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
        
        <Content style={{background: 'transparent'}}>
          <Content.Body>

          {/* <video id="player-container-id" width="414" height="270" preload="auto" playsinline webkit-playsinline>
          </video> */}
            <Card className="card card-player-function" style={{ borderRadius: '8px'}}>
              <H3>{t('请选择视频播放功能进行体验')}</H3>
              <br />
              <Form>
                <Form.Item label={<div style={flexStyle}>
                  <img id="icon-play" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-play.png" />
                  <H5>{t('视频播放')}</H5>
                </div>}>
                  <Segment
                    value={value.toString()}
                    onChange={switchFunc}
                    rimless={true}
                    options={[
                      {text: t('URL播放'), value: 'playurl'},
                      {text: t('FileID播放'), value: 'playfileid'},
                      { text: t("自适应码流"), value: "qualityApi" },
                      { text: t("DASH 播放"), value: "dash" },
                    ]}>
                  </Segment>
                </Form.Item>

                <Form.Item label={<div style={flexStyle}>
                  <img id="icon-control" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-control.png" />
                  <H5>{t('播放控制')}</H5>
                </div>}>
                  <Segment
                    value={value.toString()}
                    onChange={switchFunc}
                    rimless={true}
                    options={[
                      { text: t("缩略图预览-云端生成文件"), value: "vttThumbnail" },
                      { text: t("缩略图预览-手动传入文件"), value: "vttThumbnailSrc"},
                      { text: t("字幕"), value: "subtitles" },
                      { text: t("事件回调"), value: "event" },
                    ]}>
                  </Segment>
                </Form.Item>
                <Form.Item label={<div style={flexStyle}>
                  <img id="icon-safety" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-safety.png" />
                  <H5>{t('视频安全')}</H5>
                </div>}>
                  <Segment
                    value={value.toString()}
                    onChange={switchFunc}
                    rimless={true}
                    options={[
                      { text: t("动态水印"), value: "dynamicWatermark" },
                      { text: t("幽灵水印"), value: "ghostWatermark" },
                      { text: t("Key 防盗链"), value: "key" },
                    ]}>
                  </Segment>
                </Form.Item>
                <Form.Item label={<div style={flexStyle}>
                  <img id="icon-display" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-display.png" />
                  <H5>{t('显示效果')}</H5>
                </div>}>
                  <Segment
                    value={value.toString()}
                    onChange={switchFunc}
                    rimless={true}
                    options={[
                      { text: t("贴片广告"), value: "poster" },
                      { text: t("视频镜像"), value: "mirror" },
                      { text: t("提示文案"), value: "customError" },
                      { text: t("播放器尺寸"), value: "sizeAdaptive" },
                      { text: t("自定义 UI"), value: "customUI", },
                      { text: t("多实例"), value: "multi" },
                      { text: t("多语言"), value: "language" },
                    ]}>
                  </Segment>
                </Form.Item>
                <Form.Item label={<div style={flexStyle}>
                  <img id="icon-data" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-data.png" />
                  <H5>{t('统计信息')}</H5>
                </div>}>
                  <Segment
                    value={value.toString()}
                    onChange={switchFunc}
                    rimless={true}
                    options={[
                      { text: t("统计信息"), value: "fileStatistic" },
                    ]}>
                  </Segment>
                </Form.Item>
              </Form>
              {/* <Form>
                <Form.Item label={t("播放器功能")}>
                  <Segment
                    value={value.toString()}
                    onChange={value => {
                      if (value === 'more') {
                        if (window.lang === 'en') {
                          window.open('https://github.com/tcplayer/tcplayer-demo/tree/main/src/demo/en');
                        } else {
                          window.open('https://github.com/tcplayer/tcplayer-demo/tree/main/src/demo/zh');
                        }
                        
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
                      // { text: t("贴片广告"), value: "poster" },
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
                          <span className="more-btn">{t('更多')}</span>
                        </>
                      ), value: "more" },
                      // { text: "HLS 自适应码流播放", value: "hlsMasterplaylist" },
                      // { text: "Referer 防盗链", value: "levelSwitchTips" },
                      // { text: "HLS 加密播放", value: "levelSwitchTips" },
                      // { text: "弹幕", value: "subtitles" },                      
                    ]}
                  />
                </Form.Item>
              </Form> */}
            </Card>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <iframe
                id="previewIframe"
                title="previewIframe"
                srcDoc={code}
                frameBorder="0"
                width="640px"
                height="360px"
                allowFullScreen={true}
                style={{borderRadius: '8px', margin: '20px 20px 20px 0', background: '#bdbdbd'}}
              ></iframe>
              <Card style={{width: 'calc(100% - 640px - 20px)', height: '360px', overflow: 'scroll', borderRadius: '8px', margin: '20px 0 20px 0', padding: '10px 0 0 10px', position: 'relative' }}>
                {/* <Card.Body> */}
                  <section>

                    {
                      value === 'playurl' ? <>
                        <PlayPanel key="playurl" onPreview={onPreview} type="url"></PlayPanel>
                      </> : null
                    }

                    {
                      value === 'playfileid' ? <>
                        <PlayPanel key="playfileid" onPreview={onPreview} type="fileid"></PlayPanel>
                      </> : null
                    }

                    {
                      value !== 'playurl' && value !== 'playfileid' ? <>
                        <Copy text={code}>
                          <img id="icon-copy" style={{ width: '16px', height: '16px', cursor: 'pointer', marginLeft: '650px' }} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-copy.png" />
                        </Copy>
                        <MonacoEditor
                          // className="tea-code-pre"
                          monaco={monaco}
                          height={360}
                          value={code}
                          language="javascript"
                          onChange={val => setCode(val)}
                          defaultValue={code}
                        />
                      </> : null
                    }               
                  </section>
                {/* </Card.Body> */}
              </Card>
            </div>

            {/* <Justify
              left={
                <Card style={{width: '100%'}}>
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
              }
              right={
                <Card style={{width: '100%'}}>
                  <Card.Body>
                    <section>
                      {
                        value === 'play' ? <>
                          <PlayPanel onPreview={onPreview}></PlayPanel>
                        </> : <>
                        <Copy text={code}/>
                        <MonacoEditor
                          // className="tea-code-pre"
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
                  </Card.Body>
                </Card>
              }

            /> */}
            {/* <div style={{ display: 'flex' }}>
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

              <Card>
                <Card.Body>
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
                </Card.Body>
              </Card>
            </div> */}

            {/* <Card className="card card-preview">
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

                
              </Form>
            </Card> */}
            {
              docs[value] ? (
                <Card style={{ borderRadius: '8px'}}>
                  <Card.Body>
                    {
                      <div>{docs[value]}</div>
                    }
                  </Card.Body>
                </Card>
              ) : null
            }
              
          </Content.Body>
        </Content>
      </Body>
    </Layout>
  );
}
export default App;
